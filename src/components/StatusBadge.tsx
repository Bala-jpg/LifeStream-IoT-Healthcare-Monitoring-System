import React from 'react';

type Status = 'normal' | 'warning' | 'critical';

interface Props {
  status?: Status;
}

const StatusBadge: React.FC<Props> = ({ status = 'normal' }) => {
  const map: Record<Status, { color: string; label: string }> = {
    normal: { color: '#10b981', label: 'Normal' },
    warning: { color: '#f59e0b', label: 'Warning' },
    critical: { color: '#ef4444', label: 'Critical' },
  };
  const entry = map[status] || map.normal;

  return (
    <div className="status-badge" style={{ borderColor: entry.color }}>
      <span className="status-dot" style={{ background: entry.color }} />
      <span className="status-label">{entry.label}</span>
    </div>
  );
};

export default StatusBadge;
