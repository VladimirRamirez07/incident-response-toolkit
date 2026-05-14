from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Incident Response Toolkit",
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

@app.get("/")
async def root():
    return {"message": "Incident Response Toolkit API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}