import { useState } from 'react'
import { Shield, LogIn } from 'lucide-react'
import axios from 'axios'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const form = new FormData()
      form.append('username', username)
      form.append('password', password)
      const res = await axios.post('http://localhost:8000/api/v1/auth/login', form)
      localStorage.setItem('token', res.data.access_token)
      onLogin(res.data.access_token)
    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Shield size={48} color="#58a6ff" />
          <h1 style={{ color: '#58a6ff', margin: '12px 0 4px' }}>
            Incident Response Toolkit
          </h1>
          <p style={{ color: '#8b949e', fontSize: '14px' }}>
            SOC Platform — Sign in to continue
          </p>
        </div>

        {error && (
          <div style={{
            background: '#ff444420',
            border: '1px solid #ff4444',
            borderRadius: '8px',
            padding: '10px',
            color: '#ff4444',
            fontSize: '14px',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        <div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#8b949e', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#e6edf3',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              placeholder="analyst01"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#8b949e', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#e6edf3',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#1f6feb80' : '#1f6feb',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <LogIn size={18} />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}