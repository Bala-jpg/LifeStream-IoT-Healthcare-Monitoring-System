-- # Healthcare Dashboard Implementation Guide

## 📋 Project Setup

This comprehensive guide explains the healthcare dashboard implementation and how to customize it for your needs.

## 🏗️ Project Structure

### File Organization

```
iot-healtcare-system/
├── src/
│   ├── components/              # Reusable React components
│   │   ├── Dashboard.tsx        # Main dashboard container
│   │   ├── PatientCard.tsx      # Individual patient card component
│   │   ├── PatientDetail.tsx    # Detailed patient modal view
│   │   ├── AlertPanel.tsx       # Alert notifications sidebar
│   │   ├── SearchFilter.tsx     # Search & filter controls
│   │   ├── Gauge.tsx            # Donut gauge visualization
│   │   ├── VitalChart.tsx       # Line chart for vital history
│   │   └── index.ts             # Component barrel exports
│   ├── types/
│   │   └── patient.ts           # TypeScript type definitions
│   ├── utils/
│   │   ├── alertUtils.ts        # Anomaly detection & formatting
│   │   └── mockData.ts          # Mock data generation
│   ├── App.tsx                  # Root React component
│   ├── App.css                  # Component styles
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── package.json                 # Dependencies & scripts
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                    # This file
```

## 🔑 Key Components Explained

### Dashboard Component (`src/components/Dashboard.tsx`)

**Purpose**: Main orchestrator component that manages application state and real-time data.

**Key Features**:
- Initializes patient data with mock generator
- Manages alert state with anomaly detection
- Handles patient filtering and searching
- Renders sidebar (alerts) and main content (patients)
- Manages patient detail modal

**State Management**:
```typescript
const [patients, setPatients] = useState<Patient[]>([]);      // All patients
const [alerts, setAlerts] = useState<Alert[]>([]);            // Alert log
const [searchQuery, setSearchQuery] = useState('');           // Search input
const [filterStatus, setFilterStatus] = useState<FilterType>('all'); // Filter
const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null); // Detail view
const [vitalHistory, setVitalHistory] = useState<VitalHistory[]>([]); // Chart data
```

**Real-Time Updates**:
- Uses `simulateRealtimeUpdates()` to generate new vital signs every 5 seconds
- Automatic anomaly detection triggers alert creation
- Critical alerts trigger toast notifications

### PatientCard Component (`src/components/PatientCard.tsx`)

**Purpose**: Displays a compact patient health card with vital signs and status.

**Key Elements**:
- Color-coded border indicating health status
- Patient name, age, and room number
- Quick vital signs summary with color indicators
- Embedded gauges for visual representation
- "View Details" button for modal

**Status Indicators**:
- Green: All vitals normal
- Amber: At least one warning
- Red: At least one critical value

### AlertPanel Component (`src/components/AlertPanel.tsx`)

**Purpose**: Sidebar component displaying all system alerts sorted by severity.

**Features**:
- Displays critical alerts first (red)
- Warning alerts in second (amber)
- Info alerts last (blue)
- Alert count badges at the top
- Dismiss button for each alert
- Smooth animations for new alerts

**Alert Lifecycle**:
1. Anomaly detected in patient vitals
2. Alert created and added to panel
3. Critical alerts trigger toast notification
4. User can dismiss alert (marked as read)

### Gauge Component (`src/components/Gauge.tsx`)

**Purpose**: Visual gauge representation of vital signs using donut charts.

**Features**:
- Color-coded based on thresholds
- Shows current value and range
- Status label (Normal/Warning/Critical)
- Uses Recharts PieChart for visualization

**Color Logic**:
```typescript
if (value < criticalThreshold) color = '#ef4444'  // Red
else if (value < warningThreshold) color = '#f59e0b'  // Amber
else color = '#10b981'  // Green
```

### VitalChart Component (`src/components/VitalChart.tsx`)

**Purpose**: Time-series chart showing vital signs history.

**Features**:
- Dual-axis chart (SpO2 and Heart Rate)
- Tooltip on hover
- 24-hour history visualization
- Legend showing both metrics
- Responsive sizing

### SearchFilter Component (`src/components/SearchFilter.tsx`)

**Purpose**: Search and filter controls for patient list.

**Controls**:
1. **Search Box**: Text input for patient name/ID/room
2. **Status Filter**: Dropdown with All/Critical/Warning/Normal
3. **Patient Count**: Shows filtered vs total patients

## 📊 Data Types & Interfaces

### Patient Type
```typescript
interface Patient {
  id: string;              // e.g., "P001"
  name: string;            // e.g., "John Anderson"
  age: number;             // e.g., 45
  room?: string;           // e.g., "102"
  spO2: VitalSign;         // Oxygen saturation
  heartRate: VitalSign;    // Heart rate in BPM
  temperature?: number;    // e.g., 37.2
  bloodPressure?: {        // Optional
    systolic: number;      // e.g., 120
    diastolic: number;     // e.g., 80
  };
}
```

### VitalSign Type
```typescript
interface VitalSign {
  timestamp: number;  // Unix timestamp (milliseconds)
  value: number;     // The actual measurement
}
```

### Alert Type
```typescript
interface Alert {
  id: string;        // Unique identifier
  patientId: string; // Link to patient
  patientName: string; // Display name
  type: 'critical' | 'warning' | 'info'; // Severity
  message: string;   // Alert text
  timestamp: number; // When generated
  read: boolean;     // Dismiss status
}
```

## 🔧 Utility Functions

### Anomaly Detection (`src/utils/alertUtils.ts`)

**detectAnomalies(patient): Alert[]**
- Checks all vital signs against normal ranges
- Returns array of alerts for the patient
- Called whenever patient data changes

**isAnomalous(patient): boolean**
- Quick check if patient has any anomalies
- Used for filtering

**getAnomalySeverity(patient): 'critical' | 'warning' | 'normal'**
- Determines worst-case status
- Used for color-coding cards

**Example Usage**:
```typescript
const alerts = detectAnomalies(patient);
const severity = getAnomalySeverity(patient);
const hasIssues = isAnomalous(patient);
```

### Mock Data Generation (`src/utils/mockData.ts`)

**generateMockPatients(): Patient[]**
- Creates 8 realistic patient profiles
- Simulates different health statuses
- Returns array of Patient objects

**generateMockVitalHistory(count?): VitalHistory[]**
- Generates historical vital signs
- Default 20 data points
- Used for chart visualization

**simulateRealtimeUpdates(patients, callback, interval): () => void**
- Simulates real-time data updates
- Adds realistic variations to vitals
- Returns cleanup function
- Default interval: 5000ms

**Example Usage**:
```typescript
const patients = generateMockPatients();
const cleanup = simulateRealtimeUpdates(
  patients,
  (updated) => setPatients(updated),
  5000
);

// Later, cleanup on unmount
return cleanup;
```

## 🎨 Styling System

### CSS Architecture

**Global Styles** (`src/index.css`)
- Reset and base styles
- Button defaults
- HTML/body styling

**Component Styles** (`src/App.css`)
- All component-specific styles
- CSS custom properties (variables)
- Responsive breakpoints
- Animations and transitions

**CSS Custom Properties**
```css
:root {
  --primary-color: #3b82f6;     /* Blue */
  --secondary-color: #10b981;   /* Green */
  --warning-color: #f59e0b;     /* Amber */
  --danger-color: #ef4444;      /* Red */
  --border-radius: 12px;
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --transition: all 0.3s ease;
}
```

### Responsive Breakpoints

```css
/* Desktop: 1200px+ */
.dashboard-container {
  grid-template-columns: 350px 1fr;
}

/* Tablet: 768px - 1199px */
@media (max-width: 1200px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }
}

/* Mobile: < 768px */
@media (max-width: 768px) {
  .patients-grid {
    grid-template-columns: 1fr;
  }
}
```

## 🔄 Data Flow

### Patient Data Update Flow

1. **Initial Load**
   ```
   Dashboard Mount → generateMockPatients() → setPatients()
   ```

2. **Real-Time Updates (Every 5 seconds)**
   ```
   simulateRealtimeUpdates → generateVitals() → setPatients()
   ```

3. **Anomaly Detection**
   ```
   setPatients() → useEffect detects change → detectAnomalies() → setAlerts()
   ```

4. **Alert Notification**
   ```
   Critical alert detected → toast.error() displays toast notification
   ```

5. **Filtering & Search**
   ```
   searchQuery/filterStatus changes → filteredPatients computed → render
   ```

6. **Patient Detail**
   ```
   Click PatientCard → setSelectedPatient() → PatientDetail renders
   → generateMockVitalHistory() → populate chart
   ```

## 🚀 Integration with Real APIs

### Replacing Mock Data

**Step 1**: Update Dashboard.tsx initialization
```typescript
// Replace this:
const initialPatients = generateMockPatients();

// With this:
const initialPatients = await fetchPatients();
```

**Step 2**: Create API service
```typescript
// src/services/patientAPI.ts
export async function fetchPatients(): Promise<Patient[]> {
  const response = await fetch('/api/patients');
  if (!response.ok) throw new Error('Failed to fetch patients');
  return response.json();
}

export async function subscribeToUpdates(
  callback: (patient: Patient) => void
): Promise<() => void> {
  const ws = new WebSocket('wss://api.example.com/patients/live');
  ws.onmessage = (e) => callback(JSON.parse(e.data));
  return () => ws.close();
}
```

**Step 3**: Use in Dashboard
```typescript
useEffect(() => {
  const cleanup = subscribeToUpdates((updatedPatient) => {
    setPatients(prev => prev.map(p => 
      p.id === updatedPatient.id ? updatedPatient : p
    ));
  });
  return cleanup;
}, []);
```

### Expected API Response Format

```json
{
  "patients": [
    {
      "id": "P001",
      "name": "John Anderson",
      "age": 45,
      "room": "102",
      "spO2": { "timestamp": 1708957200000, "value": 98.5 },
      "heartRate": { "timestamp": 1708957200000, "value": 72 },
      "temperature": 37.1,
      "bloodPressure": { "systolic": 120, "diastolic": 80 }
    }
  ]
}
```

## 🧪 Testing Recommendations

### Unit Tests
- Test anomaly detection logic
- Test data formatting utilities
- Test component rendering with different props

### Integration Tests
- Test patient filtering and search
- Test alert generation on data changes
- Test real-time updates

### E2E Tests
- Test complete user flows
- Test modal open/close
- Test alert dismissal

## 🔐 Security Checklist

- [ ] Add authentication (JWT, OAuth, etc.)
- [ ] Implement authorization (role-based access)
- [ ] Use HTTPS for API calls
- [ ] Implement HIPAA compliance measures
- [ ] Add input validation/sanitization
- [ ] Set up audit logging
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add data encryption at rest

## 📈 Performance Optimization

### Current Optimizations
- React Compiler enabled (via Vite)
- Efficient re-rendering with state management
- Lazy loading of patient details
- Debounced search input (via onChange)

### Potential Improvements
- Implement pagination for large patient lists
- Add data caching layer
- Virtualize long alert lists
- Optimize chart rendering with useMemo
- Lazy load chart library
- Implement code splitting

## 🐛 Common Issues & Solutions

### Issue: Dashboard not updating in real-time
**Solution**: Check that `simulateRealtimeUpdates` is called in useEffect

### Issue: Alerts not appearing
**Solution**: Verify anomaly detection logic in `alertUtils.ts`, check normal ranges

### Issue: Modal not showing patient details
**Solution**: Ensure `selectedPatient` state is properly set, check modal CSS z-index

### Issue: Styles not applying
**Solution**: Verify CSS is imported in App.tsx, check class names match exactly

## 🎯 Customization Examples

### Adding New Vital Sign

1. **Update Patient Type** (`src/types/patient.ts`)
```typescript
interface Patient {
  // ... existing fields
  respiratoryRate?: VitalSign;  // New field
}
```

2. **Update Alert Ranges** (`src/types/patient.ts`)
```typescript
export const NORMAL_RANGES = {
  // ... existing ranges
  respiratoryRate: { min: 12, max: 20 },
};
```

3. **Update Anomaly Detection** (`src/utils/alertUtils.ts`)
```typescript
if (patient.respiratoryRate && 
    (patient.respiratoryRate.value < NORMAL_RANGES.respiratoryRate.min ||
     patient.respiratoryRate.value > NORMAL_RANGES.respiratoryRate.max)) {
  // Create alert
}
```

4. **Add to PatientCard** (`src/components/PatientCard.tsx`)
```typescript
{patient.respiratoryRate && (
  <div className="vital-item">
    <span className="vital-label">Respiratory Rate</span>
    <span className="vital-value">{patient.respiratoryRate.value}</span>
  </div>
)}
```

### Changing Update Frequency

In `Dashboard.tsx`:
```typescript
// Change from 5000ms to 10000ms
simulateRealtimeUpdates(initialPatients, updateCallback, 10000);
```

### Adding Patient Export

```typescript
// In PatientDetail component
<button onClick={() => {
  const csv = convertPatientToCSV(patient);
  downloadCSV(csv, `${patient.name}_vitals.csv`);
}}>
  Export Patient Data
</button>
```

## 📚 Additional Resources

- [Healthcare Dashboard README](./DASHBOARD_README.md) - Feature documentation
- [React Hooks Guide](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Recharts API](https://recharts.org/en-US/api)

---

**Last Updated**: February 2026
