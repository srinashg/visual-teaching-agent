from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.api import explanations as routes
from app.db.session import Base, get_session
from app.main import app
from app.schemas.explanations import ExplanationContent


def test_create_and_retrieve_explanation(monkeypatch):
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    Base.metadata.create_all(engine)

    def session_override():
        with Session(engine) as session:
            yield session

    def generated(_request):
        return ExplanationContent(
            explanation="The client sends a request to a server.",
            example="GET /books",
            common_mistake="Assuming every request changes data.",
            check_question="What does GET usually retrieve?",
        )

    app.dependency_overrides[get_session] = session_override
    monkeypatch.setattr(routes, "generate_explanation", generated)
    try:
        with TestClient(app) as client:
            created = client.post(
                "/api/explanations",
                json={"question": "How does a REST API work?", "difficulty": "Beginner"},
            )
            assert created.status_code == 201
            record = created.json()
            assert record["id"] == 1
            assert record["explanation"] == "The client sends a request to a server."

            detail = client.get("/api/explanations/1")
            assert detail.status_code == 200
            assert detail.json() == record

            history = client.get("/api/explanations?page=0&size=10")
            assert history.status_code == 200
            assert history.json()["total"] == 1
            assert history.json()["items"] == [record]

            assert client.get("/api/explanations/999").status_code == 404
            assert client.post(
                "/api/explanations", json={"question": "  ", "difficulty": "Beginner"}
            ).status_code == 422
    finally:
        app.dependency_overrides.clear()
        engine.dispose()
