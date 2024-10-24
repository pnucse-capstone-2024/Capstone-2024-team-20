import { Template } from '../../utils/type';
import styles from '../styles/TemplateCard.module.css';

interface TemplateCardProps {
  name: string;
  nickname: string;
  description: string;
  selectedTemplateType: string;
  setSelectedTemplateType: React.Dispatch<React.SetStateAction<string>>;
}

export default function TemplateCard({
  selectedTemplateType,
  setSelectedTemplateType,
  name,
  nickname,
  description,
}: TemplateCardProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    setSelectedTemplateType(name);
  };

  return (
    <label
      className={styles.labelContainer}
      style={{ borderColor: `${name === selectedTemplateType ? 'var(--color-blue)' : 'var(--color-lightblue)'}` }}
      htmlFor={name}
    >
      <input
        type="radio"
        name="template"
        id={name}
        value={name}
        checked={name === selectedTemplateType}
        onChange={handleChange}
      />
      <div className={styles.label}>
        <div className={styles.name}>{nickname}</div>
        <div>{description}</div>
      </div>
    </label>
  );
}
