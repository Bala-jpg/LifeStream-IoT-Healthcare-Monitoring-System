# Single-Patient Monitoring Update

## Overview
The healthcare monitoring dashboard has been refactored from a **multi-patient grid view** to a **single-patient focused monitoring system**. Users can now select one patient to monitor in detail while maintaining the ability to quickly switch between patients.

## Architecture Changes

### Dashboard Component (`src/components/Dashboard.tsx`)
**Before:** Multi-patient grid with all patients displayed simultaneously
**After:** Two-part layout with patient selector sidebar + monitoring area

#### New Layout Structure:
```
┌─────────────────────────────────────────────┐
│     Dashboard Header (Real-time Status)     │
├──────────────┬──────────────────────────────┤
│              │                              │
│   Patient    │   Live Monitoring View       │
│   Selector   │   (Selected Patient Detail)  │
│   Sidebar    │                              │
│              │   - Vital Signs Table        │
│   • All      │   - Gauges (SpO2, HR)       │
│     Patients │   - 24-Hour History Chart   │
│   • Quick    │   - Patient Info            │
│     Vitals   │                              │
│   • Status   │   Alerts (Top Bar)           │
│     Dot      │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

### State Management
- **selectedPatientId**: Tracks which patient is currently being monitored
- **alerts**: Scoped to show only alerts for the selected patient
- **vitalHistory**: Updated when patient selection changes

### Features

#### Patient Selector Sidebar
- Lists all available patients with quick vitals preview
- Color-coded severity indicators (green/yellow/red)
- Shows patient ID and room number
- Quick stats: SpO2 %, Heart Rate
- Click to switch monitoring focus
- Active state highlights selected patient

#### Monitoring Area
- Full-screen patient detail view
- Real-time vital signs updates
- Alert panel showing selected patient's alerts only
- Interactive gauges for SpO2 and heart rate
- 24-hour vital history chart
- Fullscreen mode (no modal overlay)

## CSS Updates (`src/App.css`)

### New Classes Added
| Class | Purpose |
|-------|---------|
| `.patient-selector` | Sidebar container with sticky positioning |
| `.selector-header` | Header in sidebar with patient count |
| `.patient-count` | Badge showing total patient count |
| `.patients-list` | Container for patient items |
| `.patient-item` | Individual patient button |
| `.patient-item.active` | Active/selected patient styling |
| `.patient-item-header` | Patient name + severity dot |
| `.patient-item-meta` | ID and room information |
| `.patient-item-vitals` | Quick vital signs display |
| `.severity-dot` | Color indicator (critical/warning/normal) |
| `.monitoring-area` | Main content area |
| `.top-alerts` | Alert panel container |
| `.no-patient-selected` | Placeholder when no patient selected |
| `.patient-detail-fullscreen` | Full-width monitoring view |

### Responsive Design
- **Desktop (> 1200px):** Sidebar + main content (side-by-side)
- **Tablet (≤ 1200px):** Horizontal grid layout for patient selector
- **Mobile (≤ 768px):** Responsive grid with smaller font sizes

## Functional Improvements

### 1. Focused Monitoring
- Eliminates information overload from grid view
- Allows deep focus on one patient's data
- Faster anomaly detection for selected patient

### 2. Alert Management
- Alerts filtered to selected patient only
- Critical alerts still trigger toast notifications
- Previous 50 alerts maintained in history

### 3. Real-Time Updates
- 5-second update interval for vital signs
- Automatic gauge and chart updates
- Patient list refreshes to show latest vitals

### 4. Patient Switching
- Quick sidebar selection to switch patients
- One-click navigation between patients
- Maintains alert history during session

## Component Integration

### PatientDetail.tsx
- Enhanced with `isFullscreen` prop
- No modal overlay when fullscreen
- Full width and height utilization
- Close button hidden in fullscreen mode

### AlertPanel.tsx
- Compact display in monitoring area
- Top alert bar shows 3-5 critical alerts
- Scrollable when multiple alerts present

### Real-Time Updates
- `simulateRealtimeUpdates()` continues with 5-second intervals
- `detectAnomalies()` runs for selected patient only
- Toast notifications for critical alerts

## User Experience

### Workflow
1. Dashboard loads with first patient selected
2. Patient selector sidebar shows all patients
3. Main area displays selected patient's full monitoring interface
4. Click another patient to switch focus
5. Alerts update automatically for new patient
6. Charts and gauges refresh in real-time

### Status Indicators
- **Green dot:** Normal vitals
- **Yellow dot:** Warning range exceeded
- **Red dot:** Critical alert active
- Left border color matches severity

## Technical Details

### CSS Grid Layout
```css
.dashboard-container.single-patient {
  grid-template-columns: 250px 1fr;  /* 250px sidebar + flexible main */
  gap: 20px;
}
```

### Patient Item Styling
- Hover effect with subtle slide animation
- Active state with blue border + gradient background
- Severity-based left border color
- Smooth transitions on all interactive elements

### Viewport Adjustments
- Sidebar collapses to horizontal grid on tablets
- Vitals font reduced on mobile
- Patient count badge visible on all sizes

## Migration Notes

### Components Still in Project (Unused)
- `SearchFilter.tsx` - Patient search functionality
- `PatientCard.tsx` - Individual patient card component

These can be repurposed or removed as needed.

### Backward Compatibility
All existing data structures and alert system remain unchanged. The refactoring is purely architectural.

## Testing Checklist

- [ ] Patient selector displays all patients
- [ ] Clicking patient switches monitoring view
- [ ] Vital signs update every 5 seconds
- [ ] Charts show selected patient's history
- [ ] Alerts only show for selected patient
- [ ] Critical alerts trigger toast notifications
- [ ] Sidebar sticky positioning works on scroll
- [ ] Responsive layout on tablet (1200px)
- [ ] Responsive layout on mobile (768px)
- [ ] Status dot colors change correctly
- [ ] Active patient highlighted in blue

## Future Enhancements

1. **Patient Search:** Filter sidebar by patient name/ID
2. **Quick Stats:** Add aggregated stats for selected patient
3. **Historical Comparison:** Compare current vitals with daily average
4. **Alert History:** Detailed timeline of alerts for selected patient
5. **Export Data:** Download patient vital signs data
6. **Multi-Patient View:** Optional split-screen for comparing 2 patients
7. **Notifications:** Push alerts to mobile devices
8. **Patient Notes:** Add staff comments/notes to patient record
