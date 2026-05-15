# 🛡️ Incident Response Toolkit

> SOC platform for real-time incident management, alert centralization, and post-mortem report generation.

![CI/CD](https://github.com/VladimirRamirez07/incident-response-toolkit/actions/workflows/ci.yml/badge.svg)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-2.6-E92063?style=flat-square&logo=pydantic&logoColor=white)
![WebSockets](https://img.shields.io/badge/WebSockets-Real--time-010101?style=flat-square&logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![ReportLab](https://img.shields.io/badge/ReportLab-PDF-FF0000?style=flat-square&logo=adobeacrobatreader&logoColor=white)
![Pytest](https://img.shields.io/badge/Pytest-Tests-0A9EDC?style=flat-square&logo=pytest&logoColor=white)
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
- 🔐 **JWT Authentication** with protected routes
- 🔒 **RESTful API** with FastAPI + Swagger docs
- 🧪 **Automated tests** with Pytest + GitHub Actions CI/CD
- 🐳 **Fully containerized** with Docker Compose

---

## 🏗️ Architecture

```
incident-response-toolkit/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── incidents.py
│   │   │   ├── alerts.py
│   │   │   ├── reports.py
│   │   │   └── websockets.py
│   │   ├── models/
│   │   │   ├── incident.py
│   │   │   ├── user.py
│   │   │   └── alert.py
│   │   ├── schemas/
│   │   │   ├── incident.py
│   │   │   ├── user.py
│   │   │   └── alert.py
│   │   ├── services/
│   │   │   ├── websocket_manager.py
│   │   │   └── report_generator.py
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   └── src/
│       ├── api/
│       │   ├── client.js
│       │   └── websocket.js
│       ├── components/
│       │   ├── IncidentCard.jsx
│       │   └── AlertBadge.jsx
│       ├── pages/
│       │   └── Dashboard.jsx
│       ├── App.jsx
│       └── main.jsx
│
├── docker-compose.yml
└── README.md
```

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
| Backend API | http://localhost:8001 |
| Swagger API Docs | http://localhost:8001/docs |
| ReDoc API Docs | http://localhost:8001/redoc |

### Default credentials
```
Username: analyst01
Password: soc123456
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new analyst |
| POST | `/api/v1/auth/login` | Login and get JWT token |
| GET | `/api/v1/auth/me` | Get current user |

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
| `ws://localhost:8001/api/v1/ws` | Real-time alert broadcasting |

---

## 🔴 Severity Levels

| Level | Name | SLA |
|-------|------|-----|
| 🔴 P1 | Critical | Immediate response |
| 🟠 P2 | High | Response within 1 hour |
| 🟡 P3 | Medium | Response within 4 hours |
| 🟢 P4 | Low | Response within 24 hours |

---

## 🧪 Testing

```bash
cd backend
pip install pytest pytest-asyncio httpx
pytest tests/ -v
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.11, FastAPI, SQLAlchemy, Alembic |
| Frontend | React 18, Vite, Recharts, Lucide |
| Database | PostgreSQL 15 |
| Real-time | WebSockets |
| Auth | JWT (python-jose, passlib, bcrypt) |
| Reports | ReportLab (PDF) |
| Testing | Pytest, httpx |
| DevOps | Docker, Docker Compose, GitHub Actions |

---

## 👤 Author

**Vladimir Ramirez**
- GitHub: [@VladimirRamirez07](https://github.com/VladimirRamirez07)

---

## 📄 License

MIT License — feel free to use this project for your portfolio.