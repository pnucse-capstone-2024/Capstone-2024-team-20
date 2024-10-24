import { ReactNode } from 'react';
import styles from '../styles/Title.module.css';

interface TitleProps {
  children: ReactNode;
}

export default function Title({ children }:TitleProps) {
  return (
    <div className={styles.title}>{children}</div>
  );
}
