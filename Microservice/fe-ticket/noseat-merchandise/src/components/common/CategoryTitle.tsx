import { ReactNode } from 'react';
import styles from '../styles/CategoryTitle.module.css';

export default function CategoryTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className={styles.title}>
      {children}
    </h1>
  );
}
