# 🛡️ Incident Response Toolkit

> SOC platform for real-time incident management, alert centralization, and post-mortem report generation.

![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)

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
- 🔒 **RESTful API** with FastAPI + automatic docs
- 🐳 **Fully containerized** with Docker Compose

---

## 🏗️ Architecture
├── backend/                 # FastAPI + Python
│   └── app/
│       ├── api/             # REST endpoints + WebSockets
│       ├── models/          # SQLAlchemy models
│       ├── schemas/         # Pydantic schemas
│       ├── services/        # Business logic + PDF generation
│       └── main.py
├── frontend/                # React + Vite
│   └── src/
│       ├── api/             # Axios client + WebSocket service
│       ├── components/      # Reusable UI components
│       └── pages/           # Dashboard
└── docker-compose.yml
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
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

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
| POST | `/api/v1/alerts/` | Create alert |
| PUT | `/api/v1/alerts/{id}` | Update alert |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/reports/incidents/{id}/postmortem` | Export PDF report |

### WebSocket
| Endpoint | Description |
|----------|-------------|
| `ws://localhost:8000/api/v1/ws` | Real-time alerts |

---

## 🔴 Severity Levels

| Level | Name | Description |
|-------|------|-------------|
| P1 | Critical | Immediate response required |
| P2 | High | Response within 1 hour |
| P3 | Medium | Response within 4 hours |
| P4 | Low | Response within 24 hours |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.11, FastAPI, SQLAlchemy |
| Frontend | React 18, Vite, Recharts |
| Database | PostgreSQL 15 |
| Real-time | WebSockets |
| Reports | ReportLab (PDF) |
| DevOps | Docker, Docker Compose |

---

## 👤 Author

**Vladimir Ramirez**
- GitHub: [@VladimirRamirez07](https://github.com/VladimirRamirez07)

---

## 📄 License

MIT License — feel free to use this project for your portfolio.