import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api/v1'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token automáticamente
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para manejar token expirado
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Incidents
export const incidentsAPI = {
  getAll: () => client.get('/incidents/'),
  getById: (id) => client.get(`/incidents/${id}`),
  create: (data) => client.post('/incidents/', data),
  update: (id, data) => client.put(`/incidents/${id}`, data),
  delete: (id) => client.delete(`/incidents/${id}`),
}

// Alerts
export const alertsAPI = {
  getAll: () => client.get('/alerts/'),
  getById: (id) => client.get(`/alerts/${id}`),
  create: (data) => client.post('/alerts/', data),
  update: (id, data) => client.put(`/alerts/${id}`, data),
  delete: (id) => client.delete(`/alerts/${id}`),
}

export default client