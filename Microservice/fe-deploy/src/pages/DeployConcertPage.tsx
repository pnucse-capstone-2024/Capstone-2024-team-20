import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CategoryTitle from '../components/common/CategoryTitle';
import DeployConcertForm from '../components/deploy/DeployConcertForm';
import { getTemplateList } from '../apis/template';
import { fetchWithHandler } from '../utils/fetchWithHandler';

export default function DeployConcertPage() {
  document.title = '공연 배포 | Clove 티켓';

  const [templateType, setTemplateType] = useState<string[]>([]);

  const { templateName } = useParams();

  useEffect(() => {
    fetchWithHandler(() => getTemplateList(), {
      onSuccess: (response) => {
        setTemplateType(response.data.find((t) => t[0] === templateName)[1].type);
      },
      onError: () => {},
    });
  }, []);

  return (
    <main>
      <CategoryTitle>공연 배포</CategoryTitle>
      <DeployConcertForm
        templateName={templateName}
        templateType={templateType}
      />
    </main>
  );
}
