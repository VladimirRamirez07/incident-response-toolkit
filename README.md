# 🛡️ Incident Response Toolkit

> SOC platform for real-time incident management, alert centralization, and post-mortem report generation.

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-2.6-E92063?style=flat-square&logo=pydantic&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-Real--time-010101?style=flat-square&logo=socketdotio&logoColor=white)
![ReportLab](https://img.shields.io/badge/ReportLab-PDF-FF0000?style=flat-square&logo=adobeacrobatreader&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6-5A29E4?style=flat-square&logo=axios&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🎯 Overview

A full-stack Security Operations Center (SOC) platform that centralizes security alerts in real time, classifies incidents by severity (P1–P4), assigns cases to analysts, records the complete incident timeline, and generates exportable post-mortem reports.

---

## ✨ Features

- 🚨 **Real-time alerts** via WebSockets
- 📊 **Incident classification** P1 (Critical) → P4 (Low)
- 👥 **Case assignment** to SOC analysts
- 📅 **Complete timeline** tracking per incident
- 📄 **Post-mortem PDF reports** exportable
- 🔒 **RESTful API** with FastAPI + automatic Swagger docs
- 🐳 **Fully containerized** with Docker Compose

---

## 🏗️ Architecture
incident-response-toolkit/
├── backend/                    # FastAPI + Python
│   ├── app/
│   │   ├── api/                # REST endpoints + WebSockets
│   │   │   ├── incidents.py
│   │   │   ├── alerts.py
│   │   │   ├── reports.py
│   │   │   └── websockets.py
│   │   ├── models/             # SQLAlchemy models
│   │   │   ├── incident.py
│   │   │   ├── user.py
│   │   │   └── alert.py
│   │   ├── schemas/            # Pydantic schemas
│   │   │   ├── incident.py
│   │   │   ├── user.py
│   │   │   └── alert.py
│   │   ├── services/           # Business logic
│   │   │   ├── websocket_manager.py
│   │   │   └── report_generator.py
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                   # React + Vite
│   └── src/
│       ├── api/
│       │   ├── client.js       # Axios REST client
│       │   └── websocket.js    # WebSocket service
│       ├── components/
│       │   ├── IncidentCard.jsx
│       │   └── AlertBadge.jsx
│       ├── pages/
│       │   └── Dashboard.jsx
│       ├── App.jsx
│       └── main.jsx
├── docker-compose.yml
└── README.md
---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.11+

### Run with Docker

```bash
git clone https://github.com/VladimirRamirez07/incident-response-toolkit.git
cd incident-response-toolkit
docker-compose up --build
```

### Access
| Service | URL |
|---------|-----|
| Frontend Dashboard | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger API Docs | http://localhost:8000/docs |
| ReDoc API Docs | http://localhost:8000/redoc |

---

## 📡 API Endpoints

### Incidents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/incidents/` | List all incidents |
| POST | `/api/v1/incidents/` | Create incident |
| GET | `/api/v1/incidents/{id}` | Get incident |
| PUT | `/api/v1/incidents/{id}` | Update incident |
| DELETE | `/api/v1/incidents/{id}` | Delete incident |

### Alerts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/alerts/` | List all alerts |
| POST | `/api/v1/alerts/` | Create alert (triggers WebSocket) |
| PUT | `/api/v1/alerts/{id}` | Update alert |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/reports/incidents/{id}/postmortem` | Export PDF report |

### WebSocket
| Endpoint | Description |
|----------|-------------|
| `ws://localhost:8000/api/v1/ws` | Real-time alert broadcasting |

---

## 🔴 Severity Levels

| Level | Name | SLA |
|-------|------|-----|
| 🔴 P1 | Critical | Immediate response |
| 🟠 P2 | High | Response within 1 hour |
| 🟡 P3 | Medium | Response within 4 hours |
| 🟢 P4 | Low | Response within 24 hours |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.11, FastAPI, SQLAlchemy, Alembic |
| Frontend | React 18, Vite, Recharts, Lucide |
| Database | PostgreSQL 15 |
| Real-time | WebSockets |
| Reports | ReportLab (PDF) |
| Auth | JWT (python-jose, passlib) |
| DevOps | Docker, Docker Compose |

---

## 👤 Author

**Vladimir Ramirez**
- GitHub: [@VladimirRamirez07](https://github.com/VladimirRamirez07)

---

## 📄 License

MIT License — feel free to use this project for your portfolio.