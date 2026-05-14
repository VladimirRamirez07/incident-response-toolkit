import { AlertTriangle, Clock, User } from 'lucide-react'

const severityColors = {
  P1: { bg: '#ff000020', border: '#ff0000', text: '#ff4444' },
  P2: '#ff660020',
  P3: { bg: '#ffaa0020', border: '#ffaa00', text: '#ffaa00' },
  P4: { bg: '#00aa0020', border: '#00aa00', text: '#00aa00' },
}

const severityStyle = (severity) => ({
  P1: { background: '#ff000020', borderLeft: '4px solid #ff0000', color: '#ff4444' },
  P2: { background: '#ff660020', borderLeft: '4px solid #ff6600', color: '#ff6600' },
  P3: { background: '#ffaa0020', borderLeft: '4px solid #ffaa00', color: '#ffaa00' },
  P4: { background: '#00aa0020', borderLeft: '4px solid #00aa00', color: '#00aa00' },
}[severity])

export default function IncidentCard({ incident }) {
  const style = severityStyle(incident.severity)

  return (
    <div style={{
      ...style,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} />
          <strong>{incident.title}</strong>
        </div>
        <span style={{
          background: style.borderLeft.split(' ')[2],
          color: '#fff',
          padding: '2px 10px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: style.color,
        }}>
          {incident.severity}
        </span>
      </div>
      <p style={{ margin: '8px 0', opacity: 0.8, fontSize: '14px' }}>
        {incident.description || 'No description'}
      </p>
      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', opacity: 0.7 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <User size={12} /> {incident.assigned_to || 'Unassigned'}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {new Date(incident.created_at).toLocaleString()}
        </span>
        <span style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}>
          {incident.status}
        </span>
      </div>
    </div>
  )
}