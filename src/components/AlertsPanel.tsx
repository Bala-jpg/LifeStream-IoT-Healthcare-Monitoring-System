import React from 'react';

interface AlertItem {
  id: string;
  type: 'critical' | 'warning' | 'info' | string;
  message: string;
  timestamp: number;
}

interface Props {
  alerts?: AlertItem[];
  onDismiss?: (id: string) => void;
}

const formatTime = (ts: number) => new Date(ts).toLocaleTimeString();

const AlertsPanel: React.FC<Props> = ({ alerts = [], onDismiss }) => {
  const sorted = [...alerts].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <aside className="alerts-panel">
      <div className="alerts-header">
        <h3>Active Alerts</h3>
        <div className="alerts-count">{alerts.length}</div>
      </div>

      <div className="alerts-body">
        {sorted.length === 0 ? (
          <div className="no-alerts">✓ No active alerts</div>
        ) : (
          sorted.map((a) => (
            <div key={a.id} className={`alert-item ${a.type}`}>
              <div className="alert-left">
                <div className="alert-type">{a.type.toUpperCase()}</div>
                <div className="alert-msg">{a.message}</div>
              </div>
              <div className="alert-right">
                <div className="alert-time">{formatTime(a.timestamp)}</div>
                <button className="alert-dismiss" onClick={() => onDismiss && onDismiss(a.id)}>✕</button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default AlertsPanel;
