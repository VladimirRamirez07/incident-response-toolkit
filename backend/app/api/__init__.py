from fastapi import APIRouter
from app.api.incidents import router as incidents_router
from app.api.alerts import router as alerts_router
from app.api.websockets import router as websockets_router
from app.api.reports import router as reports_router

api_router = APIRouter()
api_router.include_router(incidents_router)
api_router.include_router(alerts_router)
api_router.include_router(websockets_router)
api_router.include_router(reports_router)