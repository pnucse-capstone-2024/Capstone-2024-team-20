import { useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getSpec } from '../../apis/template';
import styles from '../styles/Microservice.module.css';

interface MicroserviceProps {
  imageName: string;
  imageList: string[];
  setImageList: React.Dispatch<React.SetStateAction<string[]>>;
  setPortVals: React.Dispatch<React.SetStateAction<[number, string][][]>>;
  setEnvVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
  setVolVals: React.Dispatch<React.SetStateAction<[string, string, string][][]>>;
  setVolMntVals: React.Dispatch<React.SetStateAction<[string, string][][]>>;
}

export default function Microservice({
  imageName,
  imageList,
  setImageList,
  setPortVals,
  setEnvVals,
  setVolVals,
  setVolMntVals,
}: MicroserviceProps) {
  const [isSpecShown, setIsSpecShown] = useState(false);
  const [spec, setSpec] = useState([]);
  const [isSpecCalled, setIsSpecCalled] = useState(false);

  const handleGetSpec = () => {
    if (!isSpecCalled) {
      const parsedImageName = imageName.split('/');
      if (parsedImageName.length > 1) {
        fetchWithHandler(() => getSpec({
          repoName: parsedImageName[0],
          imageName: parsedImageName[1],
        }), {
          onSuccess: (response) => {
            console.log(response);
            const obj = response.data;
            setSpec(Object.keys(obj).map((key) => [key, obj[key]]));
          },
          onError: (error) => {
            console.error(error);
          },
        });
      }

      setIsSpecCalled(true);
    }
  };

  return (
    <div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => {
            setIsSpecShown((prev) => !prev);
            handleGetSpec();
          }}
          className={styles.microserviceName}
        >
          {imageName}
        </button>
        <button
          type="button"
          onClick={() => {
            if (imageList.find((image) => image === imageName) === undefined) {
              setImageList((prev) => [...prev, imageName]);
              setPortVals((prev) => [...prev, []]);
              setEnvVals((prev) => [...prev, []]);
              setVolVals((prev) => [...prev, []]);
              setVolMntVals((prev) => [...prev, []]);
            }
          }}
          className={styles.button}
        >
          템플릿에 추가
        </button>
      </div>
      {isSpecShown
      && (
      <ul className={styles.specContainer}>
        {spec.map(([key, value]) => (
          <li
            key={key}
            className={styles.spec}
          >
            <div className={styles.specValue}>{key}</div>
            :
            <div className={styles.specValue}>{value}</div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
