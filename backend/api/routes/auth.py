"""Routes for authentication: signup, login, OTP verification, password reset."""

from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.ext.asyncio import AsyncSession

from backend.core.database import get_db
from backend.core.security import create_access_token, get_current_user_id
from backend.models.otp import OTPPurpose
from backend.services import otp_service, user_service
from backend.services.email_service import send_signup_otp, send_password_reset_otp
from backend.services.user_service import _hash_password

router = APIRouter(prefix="/auth", tags=["Auth"])


# ── Request / Response schemas ──

class SignupRequest(BaseModel):
    username: str | None = Field(default=None, min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    confirm_password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class VerifyOtpRequest(BaseModel):
    email: EmailStr
    otp: str = Field(min_length=6, max_length=6)


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str = Field(min_length=6, max_length=6)
    new_password: str = Field(min_length=8, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class MessageResponse(BaseModel):
    message: str


class MeResponse(BaseModel):
    id: str
    email: str
    username: str | None


# ── Endpoints ──

@router.post("/signup", response_model=MessageResponse, status_code=201)
async def signup(
    payload: SignupRequest,
    session: AsyncSession = Depends(get_db),
) -> MessageResponse:
    if payload.password != payload.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords don't match")

    existing = await user_service.get_user_by_email(session, payload.email)
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    otp_plain = await otp_service.request_otp(
        session,
        payload.email,
        OTPPurpose.SIGNUP_VERIFICATION,
        payload={
            "username": payload.username,
            "password_hash": _hash_password(payload.password),
        },
    )

    await send_signup_otp(payload.email, otp_plain)
    return MessageResponse(message=f"Verification code sent to {payload.email}")


@router.post("/verify-signup-otp", response_model=TokenResponse)
async def verify_signup_otp(
    payload: VerifyOtpRequest,
    session: AsyncSession = Depends(get_db),
) -> TokenResponse:
    otp_payload = await otp_service.verify_otp_with_payload(
        session, payload.email, OTPPurpose.SIGNUP_VERIFICATION, payload.otp
    )
    if otp_payload is None:
        raise HTTPException(status_code=400, detail="Invalid or expired verification code")

    existing = await user_service.get_user_by_email(session, payload.email)
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    from backend.models.user import User
    user = User(
        email=payload.email,
        username=otp_payload.get("username"),
        password_hash=otp_payload["password_hash"],
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)

    token = create_access_token(user.id, user.email)
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
async def login(
    payload: LoginRequest,
    session: AsyncSession = Depends(get_db),
) -> TokenResponse:
    user = await user_service.authenticate(session, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account deactivated")

    token = create_access_token(user.id, user.email)
    return TokenResponse(access_token=token)


@router.get("/me", response_model=MeResponse)
async def me(
    user_id: uuid.UUID = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_db),
) -> MeResponse:
    user = await user_service.get_user(session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return MeResponse(id=str(user.id), email=user.email, username=user.username)


@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(
    payload: ForgotPasswordRequest,
    session: AsyncSession = Depends(get_db),
) -> MessageResponse:
    user = await user_service.get_user_by_email(session, payload.email)
    if not user:
        raise HTTPException(status_code=404, detail="No account found with that email")

    otp_plain = await otp_service.request_otp(
        session, payload.email, OTPPurpose.RESET_PASSWORD
    )

    await send_password_reset_otp(payload.email, otp_plain)
    return MessageResponse(message=f"Reset code sent to {payload.email}")


@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(
    payload: ResetPasswordRequest,
    session: AsyncSession = Depends(get_db),
) -> MessageResponse:
    valid = await otp_service.verify_otp(
        session, payload.email, OTPPurpose.RESET_PASSWORD, payload.otp
    )
    if not valid:
        raise HTTPException(status_code=400, detail="Invalid or expired reset code")

    user = await user_service.get_user_by_email(session, payload.email)
    if not user:
        raise HTTPException(status_code=404, detail="No account found with that email")

    user.password_hash = _hash_password(payload.new_password)
    await session.commit()

    return MessageResponse(message="Password reset successfully")
