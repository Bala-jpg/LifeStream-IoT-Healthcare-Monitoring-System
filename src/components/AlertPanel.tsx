import React from 'react';
import type { Alert } from '../types/patient';
import { formatTime } from '../utils/alertUtils';

interface AlertPanelProps {
  alerts: Alert[];
  onDismiss?: (alertId: string) => void;
  maxHeight?: string;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({
  alerts,
  onDismiss,
  maxHeight = '400px',
}) => {
  const unreadAlerts = alerts.filter((a) => !a.read);
  const criticalAlerts = alerts.filter((a) => a.type === 'critical');
  const warningAlerts = alerts.filter((a) => a.type === 'warning');

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return '🚨';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'alert-critical';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert-info';
    }
  };

  return (
    <div className="alert-panel">
      <div className="alert-header">
        <h2>Alerts & Notifications</h2>
        <div className="alert-counts">
          {criticalAlerts.length > 0 && (
            <span className="alert-badge critical">Critical: {criticalAlerts.length}</span>
          )}
          {warningAlerts.length > 0 && (
            <span className="alert-badge warning">Warning: {warningAlerts.length}</span>
          )}
          {unreadAlerts.length === 0 && (
            <span className="alert-badge info">All clear</span>
          )}
        </div>
      </div>

      <div className="alerts-list" style={{ maxHeight }}>
        {alerts.length === 0 ? (
          <div className="no-alerts">
            <p>✓ No alerts at this time</p>
          </div>
        ) : (
          alerts
            .sort((a, b) => {
              // Sort by severity first, then by timestamp
              const severityOrder = { critical: 0, warning: 1, info: 2 };
              const severityDiff =
                severityOrder[a.type as keyof typeof severityOrder] -
                severityOrder[b.type as keyof typeof severityOrder];
              if (severityDiff !== 0) return severityDiff;
              return b.timestamp - a.timestamp;
            })
            .map((alert) => (
              <div key={alert.id} className={`alert-item ${getAlertColor(alert.type)}`}>
                <div className="alert-content">
                  <div className="alert-header-row">
                    <span className="alert-icon">{getAlertIcon(alert.type)}</span>
                    <span className="alert-patient">{alert.patientName}</span>
                    <span className="alert-time">{formatTime(alert.timestamp)}</span>
                  </div>
                  <p className="alert-message">{alert.message}</p>
                </div>
                {onDismiss && (
                  <button
                    className="alert-dismiss"
                    onClick={() => onDismiss(alert.id)}
                    aria-label="Dismiss alert"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
};
