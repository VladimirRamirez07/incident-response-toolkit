from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.units import inch
from io import BytesIO
from datetime import datetime

def generate_postmortem_report(incident: dict) -> bytes:
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Colors
    dark = HexColor('#1a1a2e')
    blue = HexColor('#58a6ff')
    red = HexColor('#ff4444')
    orange = HexColor('#ff6600')
    yellow = HexColor('#ffaa00')
    green = HexColor('#3fb950')

    severity_colors = {'P1': red, 'P2': orange, 'P3': yellow, 'P4': green}
    severity_color = severity_colors.get(incident.get('severity', 'P4'), green)

    # Title
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Title'],
        fontSize=24,
        textColor=blue,
        spaceAfter=12,
    )
    story.append(Paragraph("POST-MORTEM REPORT", title_style))
    story.append(Paragraph(f"Incident Response Toolkit", styles['Normal']))
    story.append(Spacer(1, 0.3 * inch))

    # Incident Info Table
    info_data = [
        ['Field', 'Value'],
        ['Incident ID', str(incident.get('id', 'N/A'))],
        ['Title', incident.get('title', 'N/A')],
        ['Severity', incident.get('severity', 'N/A')],
        ['Status', incident.get('status', 'N/A').upper()],
        ['Assigned To', incident.get('assigned_to') or 'Unassigned'],
        ['Created At', str(incident.get('created_at', 'N/A'))],
        ['Resolved At', str(incident.get('resolved_at') or 'Not resolved yet')],
    ]

    table = Table(info_data, colWidths=[2 * inch, 4 * inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), blue),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#ffffff')),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), HexColor('#f8f9fa')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#ffffff'), HexColor('#f0f4f8')]),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#cccccc')),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('PADDING', (0, 0), (-1, -1), 8),
        ('BACKGROUND', (1, 3), (1, 3), severity_color),
        ('TEXTCOLOR', (1, 3), (1, 3), HexColor('#ffffff')),
    ]))
    story.append(table)
    story.append(Spacer(1, 0.3 * inch))

    # Description
    story.append(Paragraph("Description", styles['Heading2']))
    story.append(Paragraph(
        incident.get('description') or 'No description provided.',
        styles['Normal']
    ))
    story.append(Spacer(1, 0.2 * inch))

    # Timeline
    story.append(Paragraph("Incident Timeline", styles['Heading2']))
    story.append(Paragraph(
        incident.get('timeline') or 'No timeline recorded.',
        styles['Normal']
    ))
    story.append(Spacer(1, 0.2 * inch))

    # Footer
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=9,
        textColor=HexColor('#888888'),
    )
    story.append(Spacer(1, 0.5 * inch))
    story.append(Paragraph(
        f"Report generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} by Incident Response Toolkit",
        footer_style
    ))

    doc.build(story)
    buffer.seek(0)
    return buffer.getvalue()