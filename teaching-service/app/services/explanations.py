import anthropic
from pydantic import ValidationError

from app.config import get_settings
from app.schemas.explanations import ExplanationContent, ExplanationCreate


class GenerationError(Exception):
    pass


def generate_explanation(request: ExplanationCreate) -> ExplanationContent:
    settings = get_settings()
    if not settings.anthropic_api_key:
        raise GenerationError("The model API key is not configured")

    client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
    try:
        message = client.messages.create(
            model=settings.anthropic_model,
            max_tokens=1400,
            system=(
                "You are a patient teacher. Return only a JSON object with four nonempty "
                "string keys: explanation, example, common_mistake, check_question. "
                "Explain accurately at the requested level. Ask a short question that checks "
                "understanding. Do not use a Markdown code fence."
            ),
            messages=[
                {
                    "role": "user",
                    "content": f"Difficulty: {request.difficulty}\nQuestion: {request.question}",
                }
            ],
        )
        if message.stop_reason != "end_turn":
            raise GenerationError("The model response was incomplete")
        text = "".join(block.text for block in message.content if block.type == "text")
        return ExplanationContent.model_validate_json(text)
    except (anthropic.APIError, ValidationError, ValueError) as exc:
        raise GenerationError("The model could not generate a complete explanation") from exc
