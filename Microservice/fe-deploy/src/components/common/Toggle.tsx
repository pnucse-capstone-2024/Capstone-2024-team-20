import styles from '../styles/Toggle.module.css';

interface ToggleProps {
  label: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Toggle({
  label,
  value,
  setValue,
}: ToggleProps) {
  const handleToggle = () => {
    setValue((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <button
        type="button"
        className={`${styles.toggleContainer} ${value && styles.toggleContainerEnabled}`}
        onClick={handleToggle}
      >
        <div className={`${styles.toggle} ${value && styles.toggleEnabled}`} />
      </button>
    </div>
  );
}
