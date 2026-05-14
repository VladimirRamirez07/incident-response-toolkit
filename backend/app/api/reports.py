from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.incident import Incident
from app.services.report_generator import generate_postmortem_report

router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("/incidents/{incident_id}/postmortem")
async def get_postmortem_report(incident_id: int, db: Session = Depends(get_db)):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")

    incident_data = {
        "id": incident.id,
        "title": incident.title,
        "description": incident.description,
        "severity": incident.severity.value,
        "status": incident.status.value,
        "assigned_to": incident.assigned_to,
        "timeline": incident.timeline,
        "created_at": str(incident.created_at),
        "resolved_at": str(incident.resolved_at) if incident.resolved_at else None,
    }

    pdf_bytes = generate_postmortem_report(incident_data)

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=postmortem-incident-{incident_id}.pdf"
        }
    )