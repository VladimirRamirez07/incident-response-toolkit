from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.alert import AlertStatus

class AlertBase(BaseModel):
    title: str
    source: Optional[str] = None
    description: Optional[str] = None
    raw_data: Optional[str] = None

class AlertCreate(AlertBase):
    pass

class AlertUpdate(BaseModel):
    status: Optional[AlertStatus] = None
    incident_id: Optional[int] = None

class AlertResponse(AlertBase):
    id: int
    status: AlertStatus
    incident_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True