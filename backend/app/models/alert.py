from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import enum

class AlertStatus(str, enum.Enum):
    NEW = "new"
    ASSIGNED = "assigned"
    DISMISSED = "dismissed"

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    source = Column(String(100))        # SIEM, IDS, firewall, etc.
    description = Column(Text)
    raw_data = Column(Text)             # JSON raw alert data
    status = Column(Enum(AlertStatus), default=AlertStatus.NEW)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())