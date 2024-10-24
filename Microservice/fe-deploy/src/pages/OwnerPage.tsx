import { useEffect, useState } from 'react';
import DeployedPlayList from '../components/deploy/DeployedPlayList';
import LinkButton from '../components/common/LinkButton';
import CategoryTitle from '../components/common/CategoryTitle';
import styles from './styles/OwnerPage.module.css';
import { fetchWithHandler } from '../utils/fetchWithHandler';
import { getNamespaces } from '../apis/deploy';
import { getEvent } from '../apis/event';

export default function OwnerPage() {
  document.title = '공연 관리 | Clove 티켓';

  const [namespaceList, setNamespaceList] = useState<string[]>([]);
  const [deployedPlayList, setDeployedPlayList] = useState([]);

  useEffect(() => {
    fetchWithHandler(() => getNamespaces(), {
      onSuccess: (response) => {
        setNamespaceList(response.data);
      },
      onError: () => {

      },
    });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const getEventListResult = await Promise.all(namespaceList.map(async (namespace) => {
        let result = null;

        await fetchWithHandler(() => getEvent(namespace), {
          onSuccess: (response) => {
            result = { ...response.data[0], namespace };
          },
          onError: () => {},
        });

        return result;
      }));

      setDeployedPlayList(getEventListResult);
    };

    fetch();
  }, [namespaceList]);

  return (
    <main>
      <div>
        <CategoryTitle>공연 관리</CategoryTitle>
        <DeployedPlayList deployedPlays={deployedPlayList} />
        <div className={styles.buttonContainer}>
          <LinkButton to="./deploy">
            새 공연 배포하기
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
