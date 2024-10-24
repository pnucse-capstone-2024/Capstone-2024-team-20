import { ReactNode } from 'react';
import styles from '../styles/LinkButton.module.css';

interface LinkButtonProps {
  to: string;
  children: ReactNode;
}

export default function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <a href={to}>
      <div className={styles.button}>
        {children}
      </div>
    </a>
  );
}
