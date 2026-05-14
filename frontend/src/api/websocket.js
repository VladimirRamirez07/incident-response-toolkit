const WS_URL = 'ws://localhost:8000/api/v1/ws'

class WebSocketService {
  constructor() {
    this.ws = null
    this.listeners = []
  }

  connect() {
    this.ws = new WebSocket(WS_URL)

    this.ws.onopen = () => {
      console.log('WebSocket connected')
    }

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.listeners.forEach(listener => listener(message))
    }

    this.ws.onclose = () => {
      console.log('WebSocket disconnected, reconnecting...')
      setTimeout(() => this.connect(), 3000)
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }

  sendPing() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'ping' }))
    }
  }

  disconnect() {
    this.ws?.close()
  }
}

export const wsService = new WebSocketService()