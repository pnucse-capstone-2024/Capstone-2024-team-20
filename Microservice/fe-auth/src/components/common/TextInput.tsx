import styles from '../styles/TextInput.module.css';

interface TextInputProps {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  secret?: boolean;
  required?: boolean;
}

export default function TextInput({
  name,
  value,
  setValue,
  required = false,
  secret = false,
}: TextInputProps) {
  return (
    <div className={styles.container}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {name}
      </label>
      <input
        className={styles.input}
        type={secret ? 'password' : 'text'}
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-required={required}
        aria-label={`${name} 입력`}
      />
    </div>
  );
}
