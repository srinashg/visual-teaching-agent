from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.models import Explanation
from app.schemas.explanations import ExplanationContent, ExplanationCreate


def save_explanation(
    session: Session, request: ExplanationCreate, content: ExplanationContent
) -> Explanation:
    record = Explanation(**request.model_dump(), **content.model_dump())
    session.add(record)
    session.commit()
    session.refresh(record)
    return record


def list_explanations(session: Session, page: int, size: int) -> tuple[list[Explanation], int]:
    total = session.scalar(select(func.count()).select_from(Explanation)) or 0
    records = session.scalars(
        select(Explanation)
        .order_by(Explanation.created_at.desc(), Explanation.id.desc())
        .offset(page * size)
        .limit(size)
    ).all()
    return list(records), total


def get_explanation(session: Session, explanation_id: int) -> Explanation | None:
    return session.get(Explanation, explanation_id)
