from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "running"

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_register_user():
    response = client.post("/api/v1/auth/register", json={
        "username": "testuser",
        "email": "test@test.com",
        "full_name": "Test User",
        "role": "analyst",
        "password": "testpass123"
    })
    assert response.status_code in [201, 400]

def test_login_invalid():
    response = client.post("/api/v1/auth/login", data={
        "username": "wronguser",
        "password": "wrongpass"
    })
    assert response.status_code == 401

def test_incidents_unauthorized():
    response = client.get("/api/v1/incidents/")
    assert response.status_code == 401

def test_alerts_unauthorized():
    response = client.get("/api/v1/alerts/")
    assert response.status_code == 401