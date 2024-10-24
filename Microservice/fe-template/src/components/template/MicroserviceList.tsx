import { useEffect, useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getImageList } from '../../apis/template';
import styles from '../styles/MicroserviceList.module.css';
import Microservice from './Microservice';
import Title from '../common/Title';

interface MicroserviceListProps {
  imageList: string[];
  setImageList: React.Dispatch<React.SetStateAction<string[]>>;
  setPortVals: React.Dispatch<React.SetStateAction<[number, string][][]>>;
  setEnvVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
  setVolVals: React.Dispatch<React.SetStateAction<[string, string, string][][]>>;
  setVolMntVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
}

export default function MicroserviceList({
  imageList,
  setImageList,
  setPortVals,
  setEnvVals,
  setVolVals,
  setVolMntVals,
}:MicroserviceListProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchWithHandler(() => getImageList(), {
      onSuccess: (response) => {
        const result = response.data.flat();
        setImages(result);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, []);

  return (
    <div className={styles.container}>
      <Title>마이크로서비스 이미지 목록</Title>
      <ul>
        {images.map((imageName) => (
          <li
            key={imageName}
            className={styles.image}
          >
            <Microservice
              imageName={imageName}
              imageList={imageList}
              setImageList={setImageList}
              setPortVals={setPortVals}
              setEnvVals={setEnvVals}
              setVolVals={setVolVals}
              setVolMntVals={setVolMntVals}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
