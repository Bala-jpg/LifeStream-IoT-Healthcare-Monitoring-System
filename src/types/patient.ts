export interface VitalSign {
  timestamp: number;
  value: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  room?: string;
  spO2: VitalSign;
  heartRate: VitalSign;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: number;
  read: boolean;
}

export interface VitalHistory {
  timestamp: number;
  spO2: number;
  heartRate: number;
}
export const NORMAL_RANGES = {
  spO2: { min: 95, max: 100 },
  heartRate: { min: 60, max: 100 },
};

export const CRITICAL_RANGES = {
  spO2: 90,
  heartRate: { min: 40, max: 120 },
};
