import React from 'react';

interface VitalCardProps {
  title: string;
  value: string | number;
  unit?: string;
  kind?: 'normal' | 'warning' | 'critical';
  theme?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  large?: boolean;
}

export const IconHeart: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21s-7.5-4.73-9.5-8.08C.9 9.9 4.2 6 7.5 6c1.7 0 3.1.9 4.5 2.4C13.4 6.9 14.8 6 16.5 6 19.8 6 23.1 9.9 21.5 12.92 19.5 16.27 12 21 12 21z" fill="currentColor" />
  </svg>
);

export const IconOxygen: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2s-4 4.5-4 7a4 4 0 008 0C16 6.5 12 2 12 2z" fill="currentColor" />
    <circle cx="12" cy="17" r="4" fill="currentColor" opacity="0.12" />
  </svg>
);

export const IconTemp: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 14.76V6a2 2 0 10-4 0v8.76A4 4 0 1014 14.76z" fill="currentColor" />
  </svg>
);

const VitalCard: React.FC<VitalCardProps> = ({
  title,
  value,
  unit = '',
  kind = 'normal',
  theme = '#3b82f6',
  icon = null,
  subtitle = '',
  large = false,
}) => {
  const severity = kind;
  return (
    <div className={`vital-card ${severity} ${large ? 'large' : ''}`}>
      <div className="vital-top">
        <div className="vital-icon" style={{ color: theme }}>
          {icon}
        </div>
        <div className="vital-title">{title}</div>
      </div>

      <div className="vital-value-row">
        <div className="vital-value">{value}</div>
        <div className="vital-unit">{unit}</div>
      </div>

      <div className="vital-footer">
        <div className="vital-subtle">{subtitle}</div>
        <div className="vital-pill" style={{ borderColor: theme, color: theme }}>
          {severity.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default VitalCard;
