import type { Patient, VitalHistory } from '../types/patient';

const PATIENT_NAMES = [
  'John Anderson',
  'Sarah Mitchell',
  'Robert Chen',
  'Emily Rodriguez',
  'Michael Thompson',
  'Lisa Johnson',
  'David Brown',
  'Jessica Williams',
];

const generateVitalsWithVariation = (baseSpO2: number, baseHR: number) => {
  // Add realistic variation
  const spO2Variation = (Math.random() - 0.5) * 2;
  const hrVariation = (Math.random() - 0.5) * 10;

  return {
    spO2: Math.max(85, Math.min(100, baseSpO2 + spO2Variation)),
    heartRate: Math.max(40, Math.min(150, baseHR + hrVariation)),
  };
};

export const generateMockPatients = (): Patient[] => {
  return PATIENT_NAMES.map((name, index) => {
    // Create variation in patient conditions
    const healthStatus = Math.random();
    let baseSpO2 = 98;
    let baseHR = 72;

    // 10% critical patients
    if (healthStatus < 0.1) {
      baseSpO2 = 88 + Math.random() * 4;
      baseHR = 35 + Math.random() * 15;
    }
    // 20% warning patients
    else if (healthStatus < 0.3) {
      baseSpO2 = 93 + Math.random() * 3;
      baseHR = 50 + Math.random() * 20 || 105 + Math.random() * 20;
    }
    // 70% normal patients
    else {
      baseSpO2 = 96 + Math.random() * 3;
      baseHR = 65 + Math.random() * 25;
    }

    const now = Date.now();
    const vitals = generateVitalsWithVariation(baseSpO2, baseHR);

    return {
      id: `P${String(index + 1).padStart(3, '0')}`,
      name: name,
      age: 40 + Math.floor(Math.random() * 40),
      room: `${100 + index}`,
      spO2: {
        timestamp: now,
        value: vitals.spO2,
      },
      heartRate: {
        timestamp: now,
        value: vitals.heartRate,
      },
      // temperature and bloodPressure removed — monitoring only SpO2 and heart rate
    };
  });
};

export const generateMockVitalHistory = (count: number = 20): VitalHistory[] => {
  const history: VitalHistory[] = [];
  const now = Date.now();
  const interval = 5 * 60 * 1000; // 5 minutes

  for (let i = count - 1; i >= 0; i--) {
    const timestamp = now - i * interval;
    const spO2 = 95 + Math.random() * 5 - 2;
    const heartRate = 70 + Math.random() * 20 - 10;

    history.push({
      timestamp,
      spO2: Math.max(85, Math.min(100, spO2)),
      heartRate: Math.max(40, Math.min(150, heartRate)),
    });
  }

  return history;
};

export const simulateRealtimeUpdates = (
  patients: Patient[],
  callback: (updatedPatients: Patient[]) => void,
  interval: number = 5000
) => {
  const updatePatients = () => {
    const updatedPatients = patients.map((patient) => {
      const vitals = generateVitalsWithVariation(patient.spO2.value, patient.heartRate.value);

      return {
        ...patient,
        spO2: {
          timestamp: Date.now(),
          value: vitals.spO2,
        },
        heartRate: {
          timestamp: Date.now(),
          value: vitals.heartRate,
        },
        // keep only SpO2 and heartRate updates
      };
    });

    callback(updatedPatients);
  };

  const intervalId = setInterval(updatePatients, interval);
  return () => clearInterval(intervalId);
};
