from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://soc_user:soc_pass@localhost:5432/soc_db"
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    APP_NAME: str = "Incident Response Toolkit"
    DEBUG: bool = True

    class Config:
        env_file = ".env"

settings = Settings()