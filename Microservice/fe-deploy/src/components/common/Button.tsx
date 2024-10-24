import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '../styles/Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  );
}
