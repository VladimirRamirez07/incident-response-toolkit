from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Incident, User, Alert
from app.database import Base
from app.config import settings
from app.api import api_router

# Crear tablas automáticamente
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="SOC platform for real-time incident management",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": f"{settings.APP_NAME} API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "app": settings.APP_NAME}