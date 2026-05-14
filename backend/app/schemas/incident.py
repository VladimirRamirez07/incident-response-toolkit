from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.incident import SeverityLevel, IncidentStatus

class IncidentBase(BaseModel):
    title: str
    description: Optional[str] = None
    severity: SeverityLevel
    assigned_to: Optional[str] = None
    timeline: Optional[str] = None

class IncidentCreate(IncidentBase):
    pass

class IncidentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[SeverityLevel] = None
    status: Optional[IncidentStatus] = None
    assigned_to: Optional[str] = None
    timeline: Optional[str] = None

class IncidentResponse(IncidentBase):
    id: int
    status: IncidentStatus
    created_at: datetime
    updated_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True