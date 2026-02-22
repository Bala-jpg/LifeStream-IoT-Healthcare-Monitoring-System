import React, { useMemo } from 'react';

interface Props {
  data?: number[];
  color?: string;
  label?: string;
}

const TrendChart: React.FC<Props> = ({ data = [], color = '#3b82f6', label = '' }) => {
  // use a small internal coordinate system so the svg scales responsively
  const vw = 100;
  const vh = 40;
  const pad = 4;

  const uid = useMemo(() => `g${Math.random().toString(36).slice(2, 9)}`, []);

  const { points, area } = useMemo(() => {
    if (!data || data.length === 0) return { points: '', area: '' };
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = Math.max(1, max - min);
    const pts = data
      .map((v, i) => {
        const x = (i / (data.length - 1 || 1)) * (vw - pad * 2) + pad;
        const y = vh - ((v - min) / range) * (vh - pad * 2) - pad;
        return `${x},${y}`;
      })
      .join(' ');

    // area polygon: baseline -> points -> baseline end
    const firstX = (0 / (data.length - 1 || 1)) * (vw - pad * 2) + pad;
    const lastX = ((data.length - 1) / (data.length - 1 || 1)) * (vw - pad * 2) + pad;
    const baseline = vh - pad;
    const areaPts = `${firstX},${baseline} ${pts} ${lastX},${baseline}`;
    return { points: pts, area: areaPts };
  }, [data]);

  return (
    <div className="trend-chart">
      <div className="trend-header">{label}</div>
      <svg viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="none" className="trend-svg">
        <defs>
          <linearGradient id={uid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {area && <polygon points={area} fill={`url(#${uid})`} className="trend-area" />}
        {points && (
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="trend-line"
          />
        )}
      </svg>
    </div>
  );
};

export default TrendChart;
