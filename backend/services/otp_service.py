"""Service layer for OTP generation and verification."""

from __future__ import annotations

import hashlib
import hmac
import secrets

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.otp import OTP, OTPPurpose

_OTP_HMAC_KEY = b"open-source-assist-otp-key"


def _generate_otp() -> str:
    return f"{secrets.randbelow(10**6):06d}"


def _hash_otp(otp: str) -> str:
    return hmac.new(_OTP_HMAC_KEY, otp.encode(), hashlib.sha256).hexdigest()


async def request_otp(
    session: AsyncSession,
    email: str,
    purpose: OTPPurpose,
    payload: dict | None = None,
) -> str:
    """Create or replace an OTP for the given email+purpose. Returns the plain OTP."""
    otp_plain = _generate_otp()
    otp_hash = _hash_otp(otp_plain)

    existing = await session.execute(
        select(OTP).where(OTP.email == email, OTP.purpose == purpose)
    )
    row = existing.scalar_one_or_none()

    if row:
        row.otp_hash = otp_hash
        row.payload = payload
    else:
        session.add(OTP(email=email, purpose=purpose, otp_hash=otp_hash, payload=payload))

    await session.commit()
    return otp_plain


async def verify_otp(
    session: AsyncSession, email: str, purpose: OTPPurpose, otp: str
) -> bool:
    """Verify and consume an OTP. Returns True on success."""
    otp_hash = _hash_otp(otp)

    result = await session.execute(
        select(OTP).where(
            OTP.email == email,
            OTP.purpose == purpose,
            OTP.otp_hash == otp_hash,
        )
    )
    row = result.scalar_one_or_none()
    if not row:
        return False

    await session.delete(row)
    await session.commit()
    return True


async def verify_otp_with_payload(
    session: AsyncSession, email: str, purpose: OTPPurpose, otp: str
) -> dict | None:
    """Verify and consume an OTP. Returns the stored payload or None on failure."""
    otp_hash = _hash_otp(otp)

    result = await session.execute(
        select(OTP).where(
            OTP.email == email,
            OTP.purpose == purpose,
            OTP.otp_hash == otp_hash,
        )
    )
    row = result.scalar_one_or_none()
    if not row:
        return None

    payload = row.payload
    await session.delete(row)
    await session.commit()
    return payload or {}
