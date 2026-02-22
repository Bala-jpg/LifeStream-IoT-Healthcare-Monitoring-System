import type { Patient, Alert } from '../types/patient';
import { NORMAL_RANGES, CRITICAL_RANGES } from '../types/patient';

export const detectAnomalies = (patient: Patient): Alert[] => {
  const alerts: Alert[] = [];
  const timestamp = Date.now();

  // Check SpO2
  if (patient.spO2.value < CRITICAL_RANGES.spO2) {
    alerts.push({
      id: `${patient.id}-spO2-critical-${timestamp}`,
      patientId: patient.id,
      patientName: patient.name,
      type: 'critical',
      message: `Critical: SpO2 level at ${patient.spO2.value}% (Critical: <${CRITICAL_RANGES.spO2}%)`,
      timestamp,
      read: false,
    });
  } else if (patient.spO2.value < NORMAL_RANGES.spO2.min) {
    alerts.push({
      id: `${patient.id}-spO2-warning-${timestamp}`,
      patientId: patient.id,
      patientName: patient.name,
      type: 'warning',
      message: `Warning: SpO2 level at ${patient.spO2.value}% (Normal: ≥${NORMAL_RANGES.spO2.min}%)`,
      timestamp,
      read: false,
    });
  }

  // Check Heart Rate
  if (
    patient.heartRate.value < CRITICAL_RANGES.heartRate.min ||
    patient.heartRate.value > CRITICAL_RANGES.heartRate.max
  ) {
    alerts.push({
      id: `${patient.id}-hr-critical-${timestamp}`,
      patientId: patient.id,
      patientName: patient.name,
      type: 'critical',
      message: `Critical: Heart rate at ${patient.heartRate.value} bpm (Critical: ${CRITICAL_RANGES.heartRate.min}-${CRITICAL_RANGES.heartRate.max} bpm)`,
      timestamp,
      read: false,
    });
  } else if (
    patient.heartRate.value < NORMAL_RANGES.heartRate.min ||
    patient.heartRate.value > NORMAL_RANGES.heartRate.max
  ) {
    alerts.push({
      id: `${patient.id}-hr-warning-${timestamp}`,
      patientId: patient.id,
      patientName: patient.name,
      type: 'warning',
      message: `Warning: Heart rate at ${patient.heartRate.value} bpm (Normal: ${NORMAL_RANGES.heartRate.min}-${NORMAL_RANGES.heartRate.max} bpm)`,
      timestamp,
      read: false,
    });
  }

  // Check Temperature if available
  // temperature monitoring removed — only SpO2 and heart rate monitored

  return alerts;
};

export const isAnomalous = (patient: Patient): boolean => {
  return (
    patient.spO2.value < NORMAL_RANGES.spO2.min ||
    patient.heartRate.value < NORMAL_RANGES.heartRate.min ||
    patient.heartRate.value > NORMAL_RANGES.heartRate.max
  );
};

export const getAnomalySeverity = (patient: Patient): 'critical' | 'warning' | 'normal' => {
  if (
    patient.spO2.value < CRITICAL_RANGES.spO2 ||
    patient.heartRate.value < CRITICAL_RANGES.heartRate.min ||
    patient.heartRate.value > CRITICAL_RANGES.heartRate.max
  ) {
    return 'critical';
  }

  if (
    patient.spO2.value < NORMAL_RANGES.spO2.min ||
    patient.heartRate.value < NORMAL_RANGES.heartRate.min ||
    patient.heartRate.value > NORMAL_RANGES.heartRate.max
  ) {
    return 'warning';
  }

  return 'normal';
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
