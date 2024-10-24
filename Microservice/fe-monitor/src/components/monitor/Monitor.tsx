import Dashboard from './Dashboard';
import styles from '../styles/Monitor.module.css';

interface MonitorProps {
  namespace: string;
  enableSlices: boolean;
  autoRefresh: boolean;
  start: number;
  end: number;
  step: string;
}

export default function Monitor({
  namespace,
  enableSlices,
  autoRefresh,
  start,
  end,
  step,
}: MonitorProps) {
  return (
    <div className={styles.container}>
      <Dashboard
        title="CPU 사용량"
        metricType="cpu"
        enableSlices={enableSlices}
        namespace={namespace}
        autoRefresh={autoRefresh}
        start={start}
        end={end}
        step={step}
        yFormat="%"
        yMax={100}
      />
      <Dashboard
        title="메모리 사용량"
        metricType="memory"
        enableSlices={enableSlices}
        namespace={namespace}
        autoRefresh={autoRefresh}
        start={start}
        end={end}
        step={step}
        yFormat="MB"
        yMax={1024}
      />
      <Dashboard
        title="네트워크 트래픽"
        metricType="network"
        enableSlices={enableSlices}
        namespace={namespace}
        autoRefresh={autoRefresh}
        start={start}
        end={end}
        step={step}
        yFormat="KB"
        yMax={1024}
      />
    </div>
  );
}
