import styles from '../styles/Input.module.css';

interface InputProps {
  type: 'password' | 'text' | 'money' | 'date' | 'textbox',
  name: string;
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  regex?: RegExp;
}

export default function Input({
  type,
  name,
  value,
  setValue,
  regex,
}: InputProps) {
  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight - 3}px`;
  };

  if (type === 'money') {
    return (
      <input
        className={styles.input}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={(e) => {
          if (/^[0-9]*$/g.test(e.target.value)) {
            setValue(e.target.value);
          }
        }}
      />
    );
  }

  if (type === 'textbox') {
    return (
      <textarea
        className={styles.textarea}
        name={name}
        id={name}
        value={value}
        rows={1}
        onChange={(e) => {
          handleTextareaResize(e);
          setValue(e.target.value);
        }}
      />
    );
  }

  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={(e) => {
        if (regex) {
          if (regex.test(e.target.value)) {
            setValue(e.target.value);
          }
        } else {
          setValue(e.target.value);
        }
      }}
    />
  );
}
