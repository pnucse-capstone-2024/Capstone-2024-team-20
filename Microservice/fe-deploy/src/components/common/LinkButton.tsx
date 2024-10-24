import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/LinkButton.module.css';

interface LinkButtonProps {
  to: string;
  children: ReactNode;
}

export default function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={styles.button}
    >
      {children}
    </Link>
  );
}
