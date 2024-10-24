import { useEffect, useState } from 'react';
import Title from '../common/Title';
import styles from '../styles/TemplateList.module.css';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getTemplateList } from '../../apis/template';
import Template from './Template';
import { TemplateInfo } from '../../utils/type';

export default function TemplateList() {
  const [templateList, setTemplateList] = useState<TemplateInfo[]>([]);

  useEffect(() => {
    fetchWithHandler(() => getTemplateList(), {
      onSuccess: (response) => {
        setTemplateList(response.data);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, []);

  return (
    <div className={styles.container}>
      <Title>템플릿 목록</Title>
      <ul className={styles.templateList}>
        {templateList.map((template, index) => (
          <li key={template[0]}>
            <Template
              index={index}
              template={template}
              setTemplateList={setTemplateList}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
