"""Ephemeral OTP database model acting as temporary key-value token cache."""

from datetime import datetime
from enum import Enum
from typing import Any

from sqlalchemy import JSON, DateTime, Integer, String, UniqueConstraint, delete, func, text
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column

from backend.core.database import Base


class OTPPurpose(str, Enum):
    SIGNUP_VERIFICATION = "SIGNUP_VERIFICATION"
    RESET_PASSWORD = "RESET_PASSWORD"


class OTP(Base):
    __tablename__ = "otps"
    __table_args__ = (
        UniqueConstraint("email", "purpose", name="uq_otps_email_purpose"),
    )
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(320), index=True, nullable=False)
    purpose: Mapped[OTPPurpose] = mapped_column(
        SqlEnum(OTPPurpose), nullable=False
    )
    otp_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    payload: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)
    expires_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=text("(now() + interval '5 minutes')"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    @classmethod
    async def purge_expired(cls, session: AsyncSession) -> int:
        """Delete all OTP rows whose expires_at has passed. Returns count deleted."""
        result = await session.execute(
            delete(cls).where(cls.expires_at < func.now())
        )
        await session.commit()
        return result.rowcount