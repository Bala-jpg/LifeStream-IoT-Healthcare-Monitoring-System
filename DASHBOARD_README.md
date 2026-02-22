# 🏥 Healthcare Monitoring Dashboard

A modern, responsive web dashboard for real-time patient health monitoring using React, TypeScript, and Vite with SWC compiler.

## ✨ Features

### Real-Time Patient Monitoring
- **Live Vital Signs Display**: Monitor patient health metrics in real-time
- **SpO2 (Oxygen Saturation)**: Gauge-based visualization with normal/warning/critical indicators
- **Heart Rate Monitoring**: Real-time BPM tracking with anomaly detection
- **Temperature Tracking**: Patient temperature monitoring
- **Blood Pressure Data**: Optional systolic/diastolic recording

### Advanced Anomaly Detection & Alerts
- **Intelligent Alert System**: Automatic detection of critical and warning conditions
- **Color-Coded Status**: 
  - 🟢 **Normal**: All vitals within healthy range
  - 🟡 **Warning**: Minor anomalies requiring attention
  - 🔴 **Critical**: Dangerous levels requiring immediate intervention
- **Real-Time Notifications**: Toast notifications for critical alerts
- **Alert History**: Searchable alert log with timestamp tracking
- **Smart Alert Management**: Dismiss and mark alerts as read

### Data Visualization
- **Responsive Gauges**: Visual representation of current vital signs
- **Line Charts**: 24-hour vital signs history with dual-axis visualization
- **Interactive Charts**: Hover tooltips showing detailed information
- **Patient Cards**: Card-based layout with quick health overview

### Patient Management
- **Comprehensive Patient Profiles**: 
  - Name, age, room number
  - Current vital signs with status badges
  - Quick access to detailed patient information
- **Patient Search**: Find patients by name, ID, or room number
- **Status Filtering**: Filter patients by health status (critical, warning, normal)
- **Detailed Patient View**: Modal with full patient history and analytics

### User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI Framework**: Card-based layout with smooth animations
- **Color-Coded Severity**: Visual indicators for quick status assessment
- **Sticky Header**: Always-visible navigation with key statistics
- **Collapsible Alert Panel**: Persistent sidebar with alert management

### Technical Excellence
- **TypeScript**: Full type safety across the application
- **Reusable Components**: Modular, well-structured React components
- **Type-Safe Interfaces**: Robust data structures for patient and alert data
- **Performance Optimized**: Efficient rendering with Vite and SWC
- **Hot Module Replacement**: Instant code updates during development

## 📊 Architecture

### Component Structure
```
src/
├── components/
│   ├── Dashboard.tsx           # Main dashboard component
│   ├── PatientCard.tsx         # Patient health card
│   ├── PatientDetail.tsx       # Detailed patient modal
│   ├── AlertPanel.tsx          # Alert notification system
│   ├── SearchFilter.tsx        # Search and filter controls
│   ├── Gauge.tsx              # Donut gauge visualization
│   ├── VitalChart.tsx         # Time-series chart
│   └── index.ts               # Component exports
├── types/
│   └── patient.ts             # TypeScript interfaces and types
├── utils/
│   ├── alertUtils.ts          # Anomaly detection logic
│   └── mockData.ts            # Mock data generation
├── App.tsx                     # Root component
├── App.css                     # Styling
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

### Data Types

#### Patient Interface
```typescript
interface Patient {
  id: string;              // Unique patient identifier
  name: string;            // Patient full name
  age: number;             // Patient age
  room?: string;           // Hospital room number
  spO2: VitalSign;         // Oxygen saturation
  heartRate: VitalSign;    // Heart rate in BPM
  temperature?: number;    // Body temperature in Celsius
  bloodPressure?: {        // Optional blood pressure
    systolic: number;
    diastolic: number;
  };
}

interface VitalSign {
  timestamp: number;       // When the measurement was taken
  value: number;          // The measured value
}

interface Alert {
  id: string;             // Unique alert ID
  patientId: string;      // Associated patient
  patientName: string;    // Patient name for display
  type: 'critical' | 'warning' | 'info';
  message: string;        // Alert description
  timestamp: number;      // When alert was generated
  read: boolean;         // Whether alert has been read
}
```

### Normal Vital Ranges
- **SpO2**: 95-100% (Critical: <90%)
- **Heart Rate**: 60-100 BPM (Critical: <40 or >120 BPM)
- **Temperature**: 36.1-37.2°C
- **Blood Pressure**: 90-120/60-80 mmHg

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The dashboard will open at `http://localhost:5173/`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

### Linting
```bash
npm run lint
```

## 🎯 Usage Guide

### Viewing Patient Dashboard
- The main dashboard displays all patients in a responsive grid layout
- Each patient card shows current vital signs with color-coded status
- Hover over cards for additional information

### Searching for Patients
1. Use the search box to find patients by:
   - Name (partial match supported)
   - Patient ID
   - Room number
2. Results update in real-time as you type

### Filtering by Status
- **All Patients**: Show all monitored patients
- **🚨 Critical**: Patients with dangerous vital signs
- **⚠️ Warning**: Patients with minor anomalies
- **✓ Normal**: Patients with healthy vital signs

### Viewing Patient Details
1. Click "View Details →" on any patient card
2. Modal opens showing:
   - Complete patient information
   - Current vital signs with status badges
   - Detailed vital signs table
   - 24-hour vital signs history chart
3. Click the ✕ button to close the modal

### Alert Management
- **Alert Panel** (left sidebar) shows real-time alerts sorted by severity
- **Critical Alerts** appear at the top in red
- **Warning Alerts** appear in amber
- **Toast Notifications** appear for critical events
- **Dismiss Alerts**: Click ✕ to mark alerts as read
- **Alert Badges** show count of critical and warning alerts

### Real-Time Updates
- Dashboard automatically updates vital signs every 5 seconds
- Anomalies are detected automatically
- Critical alerts trigger toast notifications
- Historical data accumulates over time

## 🎨 Styling Features

### Responsive Design
- **Desktop (1200px+)**: Full sidebar layout with multi-column grid
- **Tablet (768px-1199px)**: Single column layout, static sidebar
- **Mobile (<768px)**: Optimized for small screens, stacked layout

### Color Scheme
- **Primary**: Blue (#3b82f6) - Main actions and links
- **Success**: Green (#10b981) - Normal/healthy status
- **Warning**: Amber (#f59e0b) - Warning conditions
- **Danger**: Red (#ef4444) - Critical conditions
- **Neutral**: Grayscale for text and backgrounds

### Animations
- **Smooth Transitions**: 0.3s ease timing for all interactive elements
- **Slide Animations**: Alert items slide in when created
- **Hover Effects**: Cards lift on hover with shadow increase
- **Loading Spinner**: Rotating animation for loading states

## 📈 Real-Time Data Simulation

The application includes mock data generation with realistic patterns:

### Mock Data Features
- **Random Patient Generation**: Creates 8 diverse patient profiles
- **Realistic Vital Variations**: Data fluctuates naturally within ranges
- **Status Distribution**:
  - 10% critical patients
  - 20% warning patients
  - 70% normal patients
- **Auto-Updates**: Real-time simulation every 5 seconds
- **Vital History**: 20-point history for chart visualization

### Enabling Real API Integration
Replace the mock data in `src/utils/mockData.ts` and `src/components/Dashboard.tsx` with actual API calls:

```typescript
// Example: Replace generateMockPatients() with API call
const response = await fetch('/api/patients');
const patients = await response.json();
```

## 🔧 Customization

### Adjusting Alert Thresholds
Edit normal ranges in `src/types/patient.ts`:
```typescript
export const NORMAL_RANGES = {
  spO2: { min: 95, max: 100 },
  heartRate: { min: 60, max: 100 },
  // ... adjust as needed
};
```

### Changing Update Interval
In `src/components/Dashboard.tsx`:
```typescript
simulateRealtimeUpdates(initialPatients, updateCallback, 5000); // 5000ms = 5 seconds
```

### Customizing Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary-color: #3b82f6;
  --danger-color: #ef4444;
  /* ... etc */
}
```

### Alert Notification Settings
In `src/components/Dashboard.tsx`:
```typescript
toast.error(message, {
  duration: 5000,  // Toast duration in ms
  position: 'top-right',  // Notification position
});
```

## 📦 Dependencies

### Core Dependencies
- **react** (19.2.0): UI library
- **react-dom** (19.2.0): React DOM rendering
- **recharts** (2.10.3): Charting library
- **react-hot-toast** (2.4.1): Toast notifications

### Development Dependencies
- **typescript**: TypeScript compiler
- **vite**: Build tool and dev server
- **@vitejs/plugin-react**: React support for Vite
- **babel-plugin-react-compiler**: React compiler for optimizations
- **eslint**: Code linting

## 🏗️ Build & Deploy

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
Creates optimized bundle in `dist/` folder

### Type Checking
```bash
tsc -b
```

### Linting
```bash
npm run lint
```

## 🔐 Security Considerations

When deploying to production:
- Implement authentication/authorization
- Add HTTPS for all patient data
- Sanitize any user inputs
- Implement proper access controls
- Use environment variables for API endpoints
- Enable CORS appropriately
- Add rate limiting for API calls

## 🤝 Contributing

Areas for enhancement:
- Integration with real healthcare APIs
- Advanced analytics and trending
- Predictive alerts based on patterns
- Multi-user collaboration features
- Export functionality (PDF/CSV)
- Audit logging
- Dark mode implementation

## 📄 License

This project is provided as-is for educational and healthcare monitoring purposes.

## 📞 Support

For issues or questions:
1. Check the component documentation in code
2. Review TypeScript interfaces for data requirements
3. Consult alert utility functions for anomaly logic
4. Test with the mock data generation system

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Recharts Documentation](https://recharts.org)
- [React Hot Toast](https://react-hot-toast.com)

---

**Created with ❤️ for Healthcare Monitoring**
