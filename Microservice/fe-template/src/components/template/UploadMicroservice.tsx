import { useState } from 'react';
import styles from '../styles/UploadMicroservice.module.css';
import InputWithLabel from '../common/InputWithLabel';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { uploadImage } from '../../apis/template';
import Title from '../common/Title';
import { REGEX_ALPHA_UNDER_NUMBER_DASH } from '../../utils/regex';

export default function UploadMicroservice() {
  const [gitUrl, setGitUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [spec, setSpec] = useState(new Map());
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  const handleAddSpec = () => {
    if (specKey && specValue && !spec.get(specKey)) {
      setSpec((prev) => new Map([...prev, [specKey, specValue]]));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const handleDeleteSpec = (key: string) => {
    setSpec((prev) => {
      const newSpec = new Map(prev);
      newSpec.delete(key);
      return newSpec;
    });
  };

  const handleUpload = () => {
    fetchWithHandler(() => uploadImage({
      gitUrl,
      imageName,
      spec: Object.fromEntries(spec),
    }), {
      onSuccess: (response) => {
        alert('업로드 성공');
        console.log(response);
      },
      onError: (error) => {
        alert('업로드 실패');
        console.error(error);
      },
    });
    setGitUrl('');
    setImageName('');
    setSpec(new Map());
    setSpecKey('');
    setSpecValue('');
  };

  return (
    <div className={styles.container}>
      <Title>마이크로서비스 등록</Title>
      <InputWithLabel
        name="Git 주소"
        id="Git 주소"
        value={gitUrl}
        setValue={setGitUrl}
      />
      <InputWithLabel
        name="이미지 이름"
        id="이미지 이름"
        value={imageName}
        setValue={setImageName}
        regex={REGEX_ALPHA_UNDER_NUMBER_DASH}
      />
      <div className={styles.specTitle}>명세</div>
      <div className={styles.specInputContainer}>
        <InputWithLabel
          name="명세 키"
          id="명세 키"
          value={specKey}
          setValue={setSpecKey}
          regex={REGEX_ALPHA_UNDER_NUMBER_DASH}
        />
        <InputWithLabel
          name="명세 값"
          id="명세 값"
          value={specValue}
          setValue={setSpecValue}
          regex={REGEX_ALPHA_UNDER_NUMBER_DASH}
        />
        <button
          type="button"
          onClick={handleAddSpec}
        >
          추가
        </button>
      </div>
      <ul className={styles.specList}>
        {[...spec].map(([key, value]) => (
          <li
            key={`${key}-${value}`}
            className={styles.spec}
          >
            <div className={styles.specValue}>{key}</div>
            <div>:</div>
            <div className={styles.specValue}>{value}</div>
            <button
              type="button"
              onClick={() => handleDeleteSpec(key)}
            >
              제거
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={styles.uploadButton}
        onClick={handleUpload}
      >
        업로드
      </button>
    </div>
  );
}
