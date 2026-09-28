from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://teaching_app:teaching_app@localhost:5432/teaching_agent"
    anthropic_api_key: str = ""
    anthropic_model: str = "claude-haiku-4-5"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
