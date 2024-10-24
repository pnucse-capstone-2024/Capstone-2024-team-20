import { ReactNode } from 'react';
import styles from '../styles/Label.module.css';

interface LabelProps {
  children: ReactNode;
  name: string;
  unit?: string;
}

export default function Label({ children, name, unit }: LabelProps) {
  return (
    <div className={styles.container}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {name}
      </label>
      <div className={styles.input}>
        {children}
        {unit && (
        <div>
          {unit}
        </div>
        )}
      </div>
    </div>
  );
}
