import { useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { deleteTempalte, getTemplateDetail } from '../../apis/template';
import styles from '../styles/Template.module.css';
import JsonViewer from './JsonViewer';
import { TemplateInfo } from '../../utils/type';

interface TemplateProps {
  index: number;
  template: TemplateInfo;
  setTemplateList: React.Dispatch<React.SetStateAction<TemplateInfo[]>>;
}

export default function Template({
  index,
  template,
  setTemplateList,
}: TemplateProps) {
  const [isDetailShown, setIsDetailShown] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isDetailCalled, setIsDetailCalled] = useState(false);

  const handleGetDetail = () => {
    if (!isDetailCalled) {
      fetchWithHandler(() => getTemplateDetail({ item: template[0] }), {
        onSuccess: (response) => {
          setDetail(response.data);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }

    setIsDetailCalled(true);
  };

  const handleDeleteTemplate = () => {
    deleteTempalte({ item: template[0] });
    setTemplateList((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return (
    <div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => {
            setIsDetailShown((prev) => !prev);
            handleGetDetail();
          }}
          className={styles.templateName}
        >
          {template[0]}
        </button>
        <button
          type="button"
          onClick={() => handleDeleteTemplate()}
        >
          템플릿 삭제
        </button>
      </div>
      {isDetailShown
      && (
        <div className={styles.specContainer}>
          <div>
            <div className={styles.templateInfoTitle}>템플릿 별명</div>
            <div>{template[1].nickname}</div>
          </div>
          <div>
            <div className={styles.templateInfoTitle}>템플릿 설명</div>
            <div>{template[1].descirption}</div>
          </div>
          <div>
            <div className={styles.templateInfoTitle}>템플릿 타입</div>
            {template[1].type.map((t) => <div key={t}>{t}</div>)}
          </div>
          <div>
            <div className={styles.detailTitle}>템플릿 명세</div>
            <div className={styles.detailContainer}>
              <JsonViewer
                data={detail}
                depth={0}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
