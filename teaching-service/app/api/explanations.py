from fastapi import APIRouter, HTTPException, Query, status

from app.db import repositories
from app.db.session import SessionDep
from app.schemas.explanations import ExplanationCreate, ExplanationPage, ExplanationRead
from app.services.explanations import GenerationError, generate_explanation

router = APIRouter(prefix="/api/explanations", tags=["explanations"])


@router.post("", response_model=ExplanationRead, status_code=status.HTTP_201_CREATED)
def create_explanation(request: ExplanationCreate, session: SessionDep) -> ExplanationRead:
    try:
        content = generate_explanation(request)
    except GenerationError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    record = repositories.save_explanation(session, request, content)
    return ExplanationRead.model_validate(record)


@router.get("", response_model=ExplanationPage)
def list_explanations(
    session: SessionDep,
    page: int = Query(default=0, ge=0),
    size: int = Query(default=10, ge=1, le=100),
) -> ExplanationPage:
    records, total = repositories.list_explanations(session, page, size)
    return ExplanationPage(
        items=[ExplanationRead.model_validate(record) for record in records],
        page=page,
        size=size,
        total=total,
    )


@router.get("/{explanation_id}", response_model=ExplanationRead)
def get_explanation(explanation_id: int, session: SessionDep) -> ExplanationRead:
    record = repositories.get_explanation(session, explanation_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Explanation not found")
    return ExplanationRead.model_validate(record)
