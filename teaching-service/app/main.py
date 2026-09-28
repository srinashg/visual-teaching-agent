from fastapi import FastAPI

from app.api.explanations import router as explanations_router

app = FastAPI(title="Visual Teaching Agent API")
app.include_router(explanations_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
