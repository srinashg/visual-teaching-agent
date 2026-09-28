from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ExplanationCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    question: str = Field(min_length=1, max_length=2000)
    difficulty: str = Field(min_length=1, max_length=50)


class ExplanationContent(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    explanation: str = Field(min_length=1)
    example: str = Field(min_length=1)
    common_mistake: str = Field(min_length=1)
    check_question: str = Field(min_length=1)


class ExplanationRead(ExplanationCreate, ExplanationContent):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


class ExplanationPage(BaseModel):
    items: list[ExplanationRead]
    page: int
    size: int
    total: int
