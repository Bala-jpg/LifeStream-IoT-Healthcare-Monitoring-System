import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { VitalHistory } from '../types/patient';
import { formatTime } from '../utils/alertUtils';

interface VitalChartProps {
  data: VitalHistory[];
  title?: string;
}

export const VitalChart: React.FC<VitalChartProps> = ({ data, title = 'Vital Signs History' }) => {
  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h3>{title}</h3>
        <p className="no-data">No data available</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    time: formatTime(item.timestamp),
  }));

  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="time"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value: number | string) => {
              if (typeof value === 'number') return value.toFixed(1);
              return value;
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="spO2"
            stroke="#3b82f6"
            dot={false}
            strokeWidth={2}
            name="SpO2 (%)"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="heartRate"
            stroke="#ef4444"
            dot={false}
            strokeWidth={2}
            name="Heart Rate (bpm)"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
