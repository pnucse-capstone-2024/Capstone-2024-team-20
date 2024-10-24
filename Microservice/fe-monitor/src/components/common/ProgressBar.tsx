import styles from '../styles/ProgressBar.module.css';

interface ProgressBarProps {
  cur: number;
  total: number;
}

export default function ProgressBar({ cur, total }: ProgressBarProps) {
  return (
    <div className={styles.container}>
      <div
        className={styles.bar}
        style={{ width: `${(cur / total) * 100}%` }}
      />
    </div>
  );
}
