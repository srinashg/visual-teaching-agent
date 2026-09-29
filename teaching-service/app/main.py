from contextlib import asynccontextmanager
from pathlib import Path

from alembic import command
from alembic.config import Config
from fastapi import FastAPI

from app.api.explanations import router as explanations_router

_ALEMBIC_CFG = Path(__file__).parent.parent / "alembic.ini"


@asynccontextmanager
async def lifespan(app: FastAPI):
    alembic_cfg = Config(str(_ALEMBIC_CFG))
    command.upgrade(alembic_cfg, "head")
    yield


app = FastAPI(title="Visual Teaching Agent API", lifespan=lifespan)
app.include_router(explanations_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
