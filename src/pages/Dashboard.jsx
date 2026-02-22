import React, { useEffect, useState, useRef } from 'react';
import TrendChart from '../components/TrendChart';
import '../App.css';

// Simulation helpers
function randomIn(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

export default function Dashboard() {
  const MAX_POINTS = 20;
  const [hrData, setHrData] = useState(() => Array.from({ length: 12 }, () => randomIn(70, 85)));
  const [spo2Data, setSpo2Data] = useState(() => Array.from({ length: 12 }, () => randomIn(95, 99)));

  useEffect(() => {
    const id = setInterval(() => {
      setHrData((prev) => {
        const next = [...prev, randomIn(60, 120)];
        while (next.length > MAX_POINTS) next.shift();
        return next;
      });

      setSpo2Data((prev) => {
        const next = [...prev, randomIn(90, 100)];
        while (next.length > MAX_POINTS) next.shift();
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="demo-dashboard">
      <div className="demo-row">
        <div className="demo-card">
          <div className="chart-title">Heart Rate (BPM)</div>
          <TrendChart title="Heart Rate (BPM)" data={hrData} unit="BPM" lineColor="#ef4444" minY={60} maxY={120} />
        </div>

        <div className="demo-card">
          <div className="chart-title">SpO₂ Level (%)</div>
          <TrendChart title="SpO₂ (%)" data={spo2Data} unit="%" lineColor="#2563eb" minY={90} maxY={100} />
        </div>
      </div>
    </div>
  );
}
