import React, { useState, useEffect, useCallback } from 'react';
import type { Patient, Alert, VitalHistory } from '../types/patient';
import { PatientDetail } from './PatientDetail';
import { AlertPanel } from './AlertPanel';
import { getAnomalySeverity } from '../utils/alertUtils';
import { generateMockPatients, generateMockVitalHistory, simulateRealtimeUpdates } from '../utils/mockData';

export const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [vitalHistory, setVitalHistory] = useState<VitalHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize patients and setup real-time updates
  useEffect(() => {
    const initialPatients = generateMockPatients();
    setPatients(initialPatients);
    if (initialPatients.length > 0) {
      setSelectedPatientId(initialPatients[0].id);
    }
    setLoading(false);

    // Simulate real-time updates every 5 seconds
    const cleanup = simulateRealtimeUpdates(initialPatients, (updatedPatients) => {
      setPatients(updatedPatients);
    }, 5000);

    return cleanup;
  }, []);

  // Alerts from automatic anomaly detection are disabled when using mock data.
  // To re-enable, restore anomaly detection and toast notifications.
  useEffect(() => {
    // No-op: mock alerts disabled
    return;
  }, [patients, selectedPatientId, alerts]);

  // Generate vital history when patient is selected
  useEffect(() => {
    if (selectedPatientId) {
      const history = generateMockVitalHistory(20);
      setVitalHistory(history);
    }
  }, [selectedPatientId]);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);
  const severity = selectedPatient ? getAnomalySeverity(selectedPatient) : 'normal';

  const handleDismissAlert = useCallback((alertId: string) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🏥 Patient Monitoring System</h1>
            <p className="header-subtitle">Real-time Chornic Patient monitoring</p>
          </div>
          <div className="header-info">
            {selectedPatient && (
              <div
                className={`status-badge header-status-badge status-${severity}`}
                title={severity.charAt(0).toUpperCase() + severity.slice(1)}
              >
                <span className="status-icon">
                  {severity === 'normal' ? 'NORMAL ✓' : severity === 'warning' ? 'WARNING ⚠️' : 'CRITICAL🚨'}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-container single-patient">
        {/* Patient Selector Sidebar */}
        <aside className="patient-selector">
          <div className="selector-header">
            <h2>Patients</h2>
            <span className="patient-count">{patients.length}</span>
          </div>
          <div className="patients-list">
            {patients.map((patient) => {
              const patientSeverity = getAnomalySeverity(patient);
              const isSelected = patient.id === selectedPatientId;
              return (
                <button
                  key={patient.id}
                  className={`patient-item ${isSelected ? 'active' : ''} ${patientSeverity}`}
                  onClick={() => setSelectedPatientId(patient.id)}
                >
                  <div className="patient-item-header">
                    <span className="patient-name">{patient.name}</span>
                    <span className={`severity-dot ${patientSeverity}`}></span>
                  </div>
                  <div className="patient-item-meta">
                    <span>ID: {patient.id}</span>
                    {patient.room && <span>Room {patient.room}</span>}
                  </div>
                  <div className="patient-item-vitals">
                    <span>SpO2: {patient.spO2.value.toFixed(1)}%</span>
                    <span>HR: {patient.heartRate.value.toFixed(0)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Monitoring Area */}
        <main className="monitoring-area">
          {selectedPatient ? (
            <>
              {/* Top Alert Panel */}
              <div className="top-alerts">
                <AlertPanel alerts={alerts} onDismiss={handleDismissAlert} maxHeight="200px" />
              </div>

              {/* Patient Detail with Monitoring */}
              <PatientDetail
                patient={selectedPatient}
                vitalHistory={vitalHistory}
                onClose={() => {}}
                isFullscreen={true}
              />
            </>
          ) : (
            <div className="no-patient-selected">
              <p>Select a patient to monitor</p>
            </div>
          )}
        </main>
      </div>

      {/* Toast Container */}
      <div className="toast-container"></div>
    </div>
  );
};
