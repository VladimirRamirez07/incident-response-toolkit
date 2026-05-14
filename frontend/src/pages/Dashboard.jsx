import { useEffect, useState } from 'react'
import { incidentsAPI, alertsAPI } from '../api/client'
import { wsService } from '../api/websocket'
import IncidentCard from '../components/IncidentCard'
import AlertBadge from '../components/AlertBadge'
import { Shield, AlertTriangle, Bell, Activity } from 'lucide-react'

export default function Dashboard() {
  const [incidents, setIncidents] = useState([])
  const [alerts, setAlerts] = useState([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    loadData()
    wsService.connect()
    wsService.addListener(handleWsMessage)
    setConnected(true)
    return () => wsService.removeListener(handleWsMessage)
  }, [])

  const loadData = async () => {
    try {
      const [incRes, alertRes] = await Promise.all([
        incidentsAPI.getAll(),
        alertsAPI.getAll(),
      ])
      setIncidents(incRes.data)
      setAlerts(alertRes.data)
    } catch (err) {
      console.error('Error loading data:', err)
    }
  }

  const handleWsMessage = (message) => {
    if (message.type === 'new_alert') {
      setAlerts(prev => [message.data, ...prev])
    }
    if (message.type === 'incident_update') {
      loadData()
    }
  }

  const p1Count = incidents.filter(i => i.severity === 'P1').length
  const p2Count = incidents.filter(i => i.severity === 'P2').length
  const openCount = incidents.filter(i => i.status === 'open').length
  const newAlerts = alerts.filter(a => a.status === 'new').length

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: '#e6edf3', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <Shield size={32} color="#58a6ff" />
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#58a6ff' }}>
            Incident Response Toolkit
          </h1>
          <span style={{ fontSize: '12px', color: connected ? '#3fb950' : '#f85149' }}>
            ● {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Open Incidents', value: openCount, icon: <Activity size={20} />, color: '#58a6ff' },
          { label: 'Critical (P1)', value: p1Count, icon: <AlertTriangle size={20} />, color: '#ff4444' },
          { label: 'High (P2)', value: p2Count, icon: <AlertTriangle size={20} />, color: '#ff6600' },
          { label: 'New Alerts', value: newAlerts, icon: <Bell size={20} />, color: '#ffaa00' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ color: stat.color }}>{stat.icon}</div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Incidents */}
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '16px', color: '#58a6ff' }}>
            <AlertTriangle size={16} style={{ marginRight: '8px' }} />
            Active Incidents
          </h2>
          {incidents.length === 0
            ? <p style={{ opacity: 0.5, textAlign: 'center' }}>No incidents found</p>
            : incidents.map(i => <IncidentCard key={i.id} incident={i} />)
          }
        </div>

        {/* Alerts */}
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '16px', color: '#ffaa00' }}>
            <Bell size={16} style={{ marginRight: '8px' }} />
            Recent Alerts
          </h2>
          {alerts.length === 0
            ? <p style={{ opacity: 0.5, textAlign: 'center' }}>No alerts found</p>
            : alerts.map(a => <AlertBadge key={a.id} alert={a} />)
          }
        </div>
      </div>
    </div>
  )
}