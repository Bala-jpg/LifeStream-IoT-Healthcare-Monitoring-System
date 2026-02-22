import React from 'react';
import type { Patient } from '../types/patient';
import { Gauge } from './Gauge';
import { getAnomalySeverity } from '../utils/alertUtils';
import { NORMAL_RANGES } from '../types/patient';

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => {
  const severity = getAnomalySeverity(patient);
  
  const getBorderColor = () => {
    if (severity === 'critical') return 'border-red-500';
    if (severity === 'warning') return 'border-amber-500';
    return 'border-green-500';
  };

  const getHeaderBg = () => {
    if (severity === 'critical') return 'bg-red-50';
    if (severity === 'warning') return 'bg-amber-50';
    return 'bg-green-50';
  };

  return (
    <div
      className={`patient-card ${getBorderColor()} ${getHeaderBg()}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Header */}
      <div className="patient-header">
        <div>
          <h2 className="patient-name">{patient.name}</h2>
          <p className="patient-info">Age: {patient.age} years</p>
          {patient.room && <p className="patient-info">Room: {patient.room}</p>}
        </div>
        <div className={`status-badge status-${severity}`}>
          {severity.toUpperCase()}
        </div>
      </div>

      {/* Vitals Summary */}
      <div className="vitals-summary">
        <div className="vital-item">
          <span className="vital-label">SpO2</span>
          <span className={`vital-value ${patient.spO2.value < NORMAL_RANGES.spO2.min ? 'text-red-600' : 'text-green-600'}`}>
            {patient.spO2.value.toFixed(1)}%
          </span>
          <span className="vital-range">Target: ≥{NORMAL_RANGES.spO2.min}%</span>
        </div>
        
        <div className="vital-item">
          <span className="vital-label">Heart Rate</span>
          <span className={`vital-value ${
            patient.heartRate.value < NORMAL_RANGES.heartRate.min ||
            patient.heartRate.value > NORMAL_RANGES.heartRate.max
              ? 'text-red-600'
              : 'text-green-600'
          }`}>
            {patient.heartRate.value.toFixed(0)} bpm
          </span>
          <span className="vital-range">Normal: {NORMAL_RANGES.heartRate.min}-{NORMAL_RANGES.heartRate.max}</span>
        </div>
      </div>

      {/* Gauges */}
      <div className="gauges-row">
        <div className="gauge-wrapper">
          <Gauge
            value={patient.spO2.value}
            min={NORMAL_RANGES.spO2.min - 10}
            max={NORMAL_RANGES.spO2.max}
            label="Oxygen Saturation"
            unit="%"
            thresholdWarning={NORMAL_RANGES.spO2.min}
            thresholdCritical={90}
          />
        </div>
        <div className="gauge-wrapper">
          <Gauge
            value={patient.heartRate.value}
            min={40}
            max={150}
            label="Heart Rate"
            unit="bpm"
            thresholdWarning={NORMAL_RANGES.heartRate.min}
            thresholdCritical={60}
          />
        </div>
      </div>

      <div className="card-footer">
        <p className="last-updated">
          Last updated: {new Date(patient.spO2.timestamp).toLocaleTimeString()}
        </p>
        <button className="view-details-btn">View Details →</button>
      </div>
    </div>
  );
};
