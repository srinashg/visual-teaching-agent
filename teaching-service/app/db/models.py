from datetime import datetime

from sqlalchemy import DateTime, Index, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.session import Base


class Explanation(Base):
    __tablename__ = "explanations"
    __table_args__ = (Index("ix_explanations_created_at_id", "created_at", "id"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    question: Mapped[str] = mapped_column(String(2000))
    difficulty: Mapped[str] = mapped_column(String(50))
    explanation: Mapped[str] = mapped_column(Text)
    example: Mapped[str] = mapped_column(Text)
    common_mistake: Mapped[str] = mapped_column(Text)
    check_question: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
