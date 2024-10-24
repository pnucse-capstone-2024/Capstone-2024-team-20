import Button from '../common/Button';
import TemplateCard from './TemplateCard';
import styles from '../styles/TemplateForm.module.css';
import { Template } from '../../utils/type';

interface TemplateOptionProps {
  templateList: Template[];
  selectedTemplateType: string;
  setSelectedTemplateType: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>
}

export default function TemplateForm({
  templateList,
  selectedTemplateType,
  setSelectedTemplateType,
  handleSubmit,
}: TemplateOptionProps) {
  if (!templateList || templateList.length < 1) {
    return (
      <div>
        템플릿이 존재하지 않습니다.
      </div>
    );
  }

  return (
    <form
      className={styles.conatiner}
      onSubmit={handleSubmit}
    >
      <ul className={styles.cardList}>
        {templateList.map((template) => (
          <li key={template[0]}>
            <TemplateCard
              name={template[0]}
              nickname={template[1].nickname}
              description={template[1].descirption}
              selectedTemplateType={selectedTemplateType}
              setSelectedTemplateType={setSelectedTemplateType}
            />
          </li>
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <Button type="submit">
          다음
        </Button>
      </div>
    </form>
  );
}
