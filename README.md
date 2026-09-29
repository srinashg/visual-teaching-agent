# AI Visual Teaching Agent

An evolving teaching application. The first milestone generates a structured text explanation, saves it in PostgreSQL, and lets the learner return to it. Interactive visual steps and AWS integration will be designed in later milestones.

## Local setup

1. Start PostgreSQL: `docker compose up -d db`.
2. In `teaching-service`, create a Python 3.11+ virtual environment, install with `pip install -e .`, and copy `.env.example` to `.env`. Set `ANTHROPIC_API_KEY` in your environment or `.env`.
3. From `teaching-service`, run `alembic upgrade head` and `uvicorn app.main:app --reload`.
4. In `teaching-ui`, run `npm install`, copy `.env.example` to `.env.local`, and run `npm run dev`.
5. Open <http://localhost:3000>. FastAPI documentation is at <http://localhost:8000/docs>.

The API uses Anthropic's Claude Haiku as the temporary text provider, matching the source Study Assistant. Keep the API key in the backend only. `DATABASE_URL` and `ANTHROPIC_MODEL` can be overridden in `teaching-service/.env`. The default database URL matches the local Compose service exposed on port 5432.

## First milestone

- `POST /api/explanations` accepts a question and difficulty, returns a generated explanation, and saves it.
- `GET /api/explanations` returns newest first with zero-based pagination.
- `GET /api/explanations/{id}` returns one saved explanation.
- Next.js forwards browser requests to FastAPI through same-origin route handlers.
- `/demo/rest-api` offers a hand-authored, step-by-step visual walkthrough with Next, Back, and Restart controls. It runs in the UI without an API key or database.

The source project remains at [AI Study Assistant](https://github.com/srinashg/ai-study-assistant). Its RAG uploads, tools, pgvector, and final visual command schema have not been migrated yet. The walkthrough data is a UI prototype, not the final AI output format.
