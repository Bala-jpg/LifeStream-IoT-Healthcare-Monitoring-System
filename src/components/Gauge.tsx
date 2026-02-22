import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  thresholdWarning?: number;
  thresholdCritical?: number;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  min,
  max,
  label,
  unit,
  thresholdWarning = max * 0.9,
  thresholdCritical = max * 0.8,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  let color = '#10b981'; // green - normal
  let status = 'Normal';

  if (value < thresholdCritical) {
    color = '#ef4444'; // red - critical
    status = 'Critical';
  } else if (value < thresholdWarning) {
    color = '#f59e0b'; // amber - warning
    status = 'Warning';
  }

  const data = [
    { name: 'used', value: Math.max(0, Math.min(percentage, 100)) },
    { name: 'remaining', value: Math.max(0, 100 - Math.min(percentage, 100)) },
  ];

  return (
    <div className="gauge-container">
      <div className="gauge-header">
        <h3 className="gauge-label">{label}</h3>
        <p className="gauge-status" style={{ color }}>{status}</p>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="gauge-value">
        <span className="gauge-number">{value.toFixed(1)}</span>
        <span className="gauge-unit">{unit}</span>
      </div>

      <div className="gauge-range">
        <span>Min: {min}</span>
        <span>Max: {max}</span>
      </div>
    </div>
  );
};
