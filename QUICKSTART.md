# 🚀 Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Prerequisites
- Node.js 18+
- npm or yarn

### 2. Installation
```bash
cd iot-healtcare-system
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The dashboard opens at `http://localhost:5173/`

## 📋 What You'll See

### Dashboard Features
- **8 Mock Patients**: Sample data with varying health statuses
- **Real-Time Updates**: Data refreshes every 5 seconds
- **Alert System**: Critical and warning alerts appear automatically
- **Search & Filter**: Find patients by name, ID, or room
- **Detailed View**: Click any patient card to see full details

### Patient Statuses
- 🟢 **70%** patients: Normal vitals
- 🟡 **20%** patients: Warning conditions
- 🔴 **10%** patients: Critical conditions

## 🎮 Interactive Features

### Try These Actions

1. **Search a Patient**
   - Type in the search box (e.g., "John")
   - Results update instantly

2. **Filter by Status**
   - Click the status filter dropdown
   - Select: All, Critical, Warning, or Normal
   - Patient list updates

3. **View Patient Details**
   - Click "View Details →" on any patient card
   - See full vital signs, history, and 24-hour chart
   - Click ✕ to close

4. **Monitor Alerts**
   - Watch the Alert Panel on the left
   - Critical alerts show with red background
   - Click ✕ to dismiss alerts
   - Toast notifications appear for critical events

5. **Watch Real-Time Updates**
   - Vital signs update automatically every 5 seconds
   - Status colors change as values fluctuate
   - Charts update with new historical data

## 📊 Understanding the Dashboard

### Header Statistics
- **Total Patients**: Count of all monitored patients
- **Critical Count**: Patients with dangerous vitals
- **Warning Count**: Patients with minor anomalies

### Patient Card Layout
```
┌─ STATUS BADGE (Red/Amber/Green)
│
├─ PATIENT NAME
├─ Age, Room Number
│
├─ QUICK VITALS (SpO2, Heart Rate, Temp)
│
├─ VISUAL GAUGES (Donut charts)
│
└─ VIEW DETAILS BUTTON
```

### Alert Panel Sections
- **Header**: Shows alert counts by severity
- **Critical Alerts**: Red section at top
- **Warning Alerts**: Amber section in middle
- **Info Alerts**: Blue section at bottom
- **No Alerts**: Shows "✓ All clear" when quiet

## 🎨 Understanding Colors

| Color | Status | Action |
|-------|--------|--------|
| 🟢 Green | Normal | Monitor regularly |
| 🟡 Amber | Warning | Check vitals closely |
| 🔴 Red | Critical | Immediate attention |

## 🔧 Configuration Quick Edits

### Change Update Speed
**File**: `src/components/Dashboard.tsx` (Line ~70)
```typescript
// From: 5000ms (5 seconds)
// To: 10000ms (10 seconds)
simulateRealtimeUpdates(initialPatients, (updatedPatients) => {
  setPatients(updatedPatients);
}, 10000);  // ← Change this number
```

### Adjust Alert Thresholds
**File**: `src/types/patient.ts` (Lines ~30-40)
```typescript
export const NORMAL_RANGES = {
  spO2: { min: 95, max: 100 },  // ← Change SpO2 range
  heartRate: { min: 60, max: 100 },  // ← Change HR range
  temperature: { min: 36.1, max: 37.2 },  // ← Change temp range
};
```

### Change Dashboard Colors
**File**: `src/App.css` (Lines ~10-25)
```css
:root {
  --primary-color: #3b82f6;    /* ← Change blue */
  --secondary-color: #10b981;  /* ← Change green */
  --warning-color: #f59e0b;    /* ← Change amber */
  --danger-color: #ef4444;     /* ← Change red */
}
```

## 📱 Responsive Behavior

### Desktop (1200px+)
- Alert panel as left sidebar
- Multi-column patient grid
- Full-sized gauges and charts

### Tablet (768px-1199px)
- Alert panel below search
- Single column layout
- Adjusted spacing

### Mobile (<768px)
- Full-width layout
- Stacked components
- Touch-friendly buttons
- Scrollable alert panel

## 🔗 Linking to Real API

Replace mock data with API calls:

**1. In Dashboard.tsx (Line ~40)**
```typescript
// FROM:
const initialPatients = generateMockPatients();

// TO:
const response = await fetch('/api/patients');
const initialPatients = await response.json();
```

**2. Remove this import**
```typescript
import { generateMockPatients, simulateRealtimeUpdates } from '../utils/mockData';
```

**3. Set up WebSocket for real-time**
```typescript
const ws = new WebSocket('wss://api.example.com/updates');
ws.onmessage = (e) => {
  const updated = JSON.parse(e.data);
  setPatients(prev => prev.map(p => 
    p.id === updated.id ? updated : p
  ));
};
```

## 📊 Example API Response Format

Your API should return patients in this format:

```json
{
  "patients": [
    {
      "id": "P001",
      "name": "John Anderson",
      "age": 45,
      "room": "102",
      "spO2": {
        "timestamp": 1708957200000,
        "value": 98.5
      },
      "heartRate": {
        "timestamp": 1708957200000,
        "value": 72
      },
      "temperature": 37.1,
      "bloodPressure": {
        "systolic": 120,
        "diastolic": 80
      }
    }
  ]
}
```

## ⚙️ Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Type check
tsc -b
```

## 📚 File Reference

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component |
| `src/components/Dashboard.tsx` | Main dashboard |
| `src/components/PatientCard.tsx` | Patient card |
| `src/components/PatientDetail.tsx` | Detail modal |
| `src/components/AlertPanel.tsx` | Alerts sidebar |
| `src/components/Gauge.tsx` | Gauge chart |
| `src/components/VitalChart.tsx` | History chart |
| `src/types/patient.ts` | Type definitions |
| `src/utils/alertUtils.ts` | Alert logic |
| `src/utils/mockData.ts` | Mock data |
| `src/App.css` | Component styles |

## 🎯 Common Tasks

### Find & Replace Patient Names
**File**: `src/utils/mockData.ts` (Line ~5)
```typescript
const PATIENT_NAMES = [
  'John Anderson',
  'Sarah Mitchell',
  // Add your names here
];
```

### Change Number of Mock Patients
**File**: `src/utils/mockData.ts` (Line ~45)
```typescript
// Add or remove names from PATIENT_NAMES array
// Function loops through array to create patients
```

### Disable Toast Notifications
**File**: `src/components/Dashboard.tsx` (Line ~100)
```typescript
// Comment out this section:
// if (anomaly.type === 'critical') {
//   toast.error(`🚨 CRITICAL: ${anomaly.message}`);
// }
```

### Increase Alert Panel Height
**File**: `src/App.css` (Line ~430)
```css
.alerts-list {
  max-height: 600px;  /* ← Increase from 600px */
}
```

## 🐛 Troubleshooting

### Issue: Page doesn't load
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Issue: Port 5173 already in use
```bash
# Start on different port
npm run dev -- --port 3000
```

### Issue: TypeScript errors
```bash
# Check types
tsc -b
```

### Issue: Styles not showing
- Hard refresh browser (Ctrl+Shift+R)
- Check if `App.css` is imported in `App.tsx`
- Verify CSS class names match component

## 🎓 Next Steps

1. **Understand the Code**
   - Read `IMPLEMENTATION_GUIDE.md` for deep dive
   - Check component comments for explanations
   - Review type definitions in `src/types/patient.ts`

2. **Customize for Your Data**
   - Update patient data structure if needed
   - Adjust vital sign thresholds
   - Change colors to match your branding

3. **Connect to Real API**
   - Replace mock data generator
   - Set up authentication
   - Implement WebSocket for updates

4. **Deploy to Production**
   - Run `npm run build`
   - Deploy `dist/` folder to hosting
   - Set up environment variables
   - Configure HTTPS

## 📞 Need Help?

- Check `DASHBOARD_README.md` for features
- Review `IMPLEMENTATION_GUIDE.md` for architecture
- Look at component code comments
- Check package documentation:
  - [React](https://react.dev)
  - [Recharts](https://recharts.org)
  - [React Hot Toast](https://react-hot-toast.com)

## 🎉 You're Ready!

The dashboard is now running with:
- ✅ Real-time data updates
- ✅ Automatic anomaly detection
- ✅ Alert notifications
- ✅ Patient search & filtering
- ✅ Responsive design
- ✅ Beautiful UI

**Start monitoring patients now!** 🏥

---

**Happy Monitoring!** 💚
