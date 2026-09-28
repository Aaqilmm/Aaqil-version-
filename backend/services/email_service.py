"""Email service for sending OTP codes via SMTP."""

from __future__ import annotations

import logging
import smtplib
from email.message import EmailMessage

from backend.core.config import settings

logger = logging.getLogger(__name__)


def _build_otp_email(to: str, otp: str, subject: str, heading: str) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = settings.MAIL_FROM
    msg["To"] = to

    html = f"""\
<html>
<body style="font-family:Arial,sans-serif;background:#f4f4f7;padding:40px 0;">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:8px;padding:32px;text-align:center;">
    <h2 style="color:#1a1a2e;">{heading}</h2>
    <p style="color:#555;font-size:15px;">Use the code below to continue. It expires in {settings.OTP_EXPIRE_MINUTES} minutes.</p>
    <div style="margin:24px 0;font-size:32px;letter-spacing:8px;font-weight:bold;color:#1a1a2e;">{otp}</div>
    <p style="color:#999;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
  </div>
</body>
</html>"""

    msg.set_content(f"Your verification code is: {otp}")
    msg.add_alternative(html, subtype="html")
    return msg


def _send(msg: EmailMessage) -> None:
    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
        if settings.SMTP_START_TLS:
            server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.send_message(msg)


async def send_signup_otp(email: str, otp: str) -> None:
    msg = _build_otp_email(
        to=email,
        otp=otp,
        subject="Verify your OpenTrack account",
        heading="Email Verification",
    )
    try:
        _send(msg)
        logger.info("Signup OTP email sent to %s", email)
    except Exception:
        logger.exception("Failed to send signup OTP email to %s", email)
        raise


async def send_password_reset_otp(email: str, otp: str) -> None:
    msg = _build_otp_email(
        to=email,
        otp=otp,
        subject="Reset your OpenTrack password",
        heading="Password Reset",
    )
    try:
        _send(msg)
        logger.info("Password reset OTP email sent to %s", email)
    except Exception:
        logger.exception("Failed to send password reset OTP email to %s", email)
        raise
