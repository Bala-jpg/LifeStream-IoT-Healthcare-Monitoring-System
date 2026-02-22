import React, { useEffect, useState, useRef, useMemo } from 'react';
import VitalCard, { IconHeart, IconOxygen } from '../components/VitalCard';
import TrendChart from '../components/TrendChart';
import AlertsPanel from '../components/AlertsPanel';
import StatusBadge from '../components/StatusBadge';
import '../App.css';

const now = () => Date.now();

const makeInitial = () => {
  const t = now();
  return {
    heartRate: { value: 72, ts: t },
    spO2: { value: 97, ts: t },
    temp: { value: 36.7, ts: t },
    trends: {
      hr: Array.from({ length: 16 }, () => 70 + Math.random() * 10),
      spo2: Array.from({ length: 16 }, () => 95 + Math.random() * 3),
    },
  };
};

const generateNext = (prev: any) => {
  const jitter = (n: number) => n + (Math.random() - 0.5) * n * 0.06;
  const hr = Math.max(40, Math.min(140, Math.round(jitter(prev.heartRate.value))));
  const spo2 = Math.max(85, Math.min(100, Math.round(jitter(prev.spO2.value))));
  const temp = Math.max(35, Math.min(40.5, +(prev.temp.value + (Math.random() - 0.5) * 0.15).toFixed(1)));

  const push = (arr: number[], v: number) => {
    const copy = arr.slice();
    copy.push(v);
    if (copy.length > 20) copy.shift();
    return copy;
  };

  return {
    heartRate: { value: hr, ts: now() },
    spO2: { value: spo2, ts: now() },
    temp: { value: temp, ts: now() },
    trends: {
      hr: push(prev.trends.hr, hr),
      spo2: push(prev.trends.spo2, spo2),
    },
  };
};

const Dashboard: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [data, setData] = useState<any>(makeInitial());
  const [alerts, setAlerts] = useState<any[]>([]);
  const idRef = useRef(1);

  useEffect(() => {
    const tId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev: any) => {
        const next = generateNext(prev);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const { heartRate, spO2, temp } = data;

    setAlerts((prev) => {
      const next = [...prev];

      // Heart rate alert: >100 or <60
      if (heartRate.value > 100 || heartRate.value < 60) {
        const key = heartRate.value > 100 ? 'hr-high' : 'hr-low';
        const exists = next.some((a: any) => a.key === key);
        if (!exists) {
          next.unshift({ id: `a-${idRef.current++}`, key, type: heartRate.value > 100 ? 'critical' : 'warning', message: `Heart Rate ${heartRate.value} bpm`, timestamp: heartRate.ts });
        }
      }

      // spO2: only alert when <90 (critical)
      if (spO2.value < 90) {
        const key = 'spo2-low';
        const exists = next.some((a: any) => a.key === key);
        if (!exists) {
          next.unshift({ id: `a-${idRef.current++}`, key, type: 'critical', message: `SpO₂ ${spO2.value.toFixed(2)}%`, timestamp: spO2.ts });
        }
      }

      // Temp alert
      if (temp.value > 38) {
        const key = 'temp-high';
        const exists = next.some((a: any) => a.key === key);
        if (!exists) {
          next.unshift({ id: `a-${idRef.current++}`, key, type: 'warning', message: `Body Temp ${temp.value}°C`, timestamp: temp.ts });
        }
      }

      // keep up to 12 alerts and preserve dismissed ones by id (dismiss removes from list)
      return next.slice(0, 12);
    });
  }, [data]);

  const handleDismiss = (id: string) => setAlerts((s) => s.filter((a) => a.id !== id));

  const overallStatus = useMemo(() => {
    if (alerts.some((a) => a.type === 'critical')) return 'critical';
    if (alerts.some((a) => a.type === 'warning')) return 'warning';
    return 'normal';
  }, [alerts]);

  return (
    <div className="ls-dashboard">
      <header className="ls-header">
        <div className="ls-title">LifeStream - IoT Patient Monitoring Dashboard</div>
        <div className="ls-header-right">
          <StatusBadge status={overallStatus as any} />
          <div className="ls-datetime">{time.toLocaleString()}</div>
        </div>
      </header>

      <main className="ls-main">
        <section className="vitals-row top-grid">
          <div className="vital-large-wrap">
            <VitalCard
              title="Heart Rate"
              value={`${data.heartRate.value}`}
              unit="BPM"
              kind={data.heartRate.value > 100 || data.heartRate.value < 60 ? (data.heartRate.value > 100 ? 'critical' : 'warning') : 'normal'}
              theme="#ef4444"
              icon={<IconHeart />}
              subtitle={`Updated ${new Date(data.heartRate.ts).toLocaleTimeString()}`}
              large
            />
          </div>

          <div className="vital-large-wrap">
            <VitalCard
              title="SpO₂ Level"
              value={`${data.spO2.value.toFixed(2)}`}
              unit="%"
              kind={data.spO2.value < 90 ? 'critical' : 'normal'}
              theme="#3b82f6"
              icon={<IconOxygen />}
              subtitle={`Updated ${new Date(data.spO2.ts).toLocaleTimeString()}`}
              large
            />
          </div>

          <div className="alerts-wrap">
            <AlertsPanel alerts={alerts} onDismiss={handleDismiss} />
          </div>
        </section>

        <section className="trends-row">
          <div className="trend-card">
            <div className="chart-title">Heart Rate (BPM)</div>
            <TrendChart data={data.trends.hr} color="#ef4444" label="Heart Rate Trend" />
          </div>
          <div className="trend-card">
            <div className="chart-title">SpO₂ Level (%)</div>
            <TrendChart data={data.trends.spo2} color="#3b82f6" label="SpO₂ Trend" />
          </div>
          <div className="trend-side">
            <div className="small-info">
              <div className="info-row">
                <div>
                  <div className="info-title">Avg HR (5m)</div>
                  <div className="info-val">{Math.round(data.trends.hr.slice(-5).reduce((a: number,b: number)=>a+b,0)/5)}</div>
                </div>
                <div>
                  <div className="info-title">Min SpO₂</div>
                  <div className="info-val">{Math.min(...data.trends.spo2).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ls-footer">LifeStream - IoT Healthcare Monitoring System – Prototype</footer>
    </div>
  );
};

export default Dashboard;
