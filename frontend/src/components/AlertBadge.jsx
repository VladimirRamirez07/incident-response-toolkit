import { Bell } from 'lucide-react'

const statusColors = {
  new: { background: '#ff000020', color: '#ff4444', border: '1px solid #ff4444' },
  assigned: { background: '#ffaa0020', color: '#ffaa00', border: '1px solid #ffaa00' },
  dismissed: { background: '#ffffff10', color: '#888', border: '1px solid #888' },
}

export default function AlertBadge({ alert }) {
  const style = statusColors[alert.status] || statusColors.new

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 14px',
      borderRadius: '8px',
      marginBottom: '8px',
      ...style,
    }}>
      <Bell size={16} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{alert.title}</div>
        <div style={{ fontSize: '12px', opacity: 0.7 }}>
          Source: {alert.source || 'Unknown'} · {new Date(alert.created_at).toLocaleString()}
        </div>
      </div>
      <span style={{
        fontSize: '11px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: '2px 8px',
        borderRadius: '10px',
        ...style,
      }}>
        {alert.status}
      </span>
    </div>
  )
}