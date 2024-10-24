import { useState } from 'react';
import { Merchandise, MerchandiseImage } from '../../utils/type';
import styles from '../styles/AddMerchandise.module.css';
import { validImageSize, validImageType } from '../../utils/image';
import Label from '../common/Label';
import Button from '../common/Button';
import { NumberToMoney } from '../../utils/convert';

interface AddMerchandiseProps {
  merchandises: Merchandise[];
  setMerchandises: React.Dispatch<React.SetStateAction<Merchandise[]>>;
}

export default function AddMerchandise({
  merchandises,
  setMerchandises,
}: AddMerchandiseProps) {
  const [image, setImage] = useState<MerchandiseImage>(null);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      if (!validImageType(fileList[0].type)) {
        alert('유효한 이미지 파일이 아닙니다.');
        return;
      }

      if (!validImageSize(fileList[0].size)) {
        alert('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }

      setImage({
        url: URL.createObjectURL(fileList[0]),
        data: fileList[0],
        ext: fileList[0].type.split('/')[1],
      });
    }
  };

  const handleAddMerchandise = () => {
    if (image !== null && name && price && count) {
      if (merchandises.find((m) => m.name === name)) {
        alert('중복된 상품입니다.');
        return;
      }

      const data: Merchandise = {
        image,
        name,
        price,
        count,
      };

      setMerchandises((prev) => [...prev, data]);

      setImage(null);
      setName('');
      setPrice(0);
      setCount(0);
    } else {
      alert('상품 데이터를 모두 입력하세요.');
    }
  };

  const handleDeleteMerchandise = (index: number) => {
    setMerchandises((prev) => [
      ...prev.slice(0, index), ...prev.slice(index + 1),
    ]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>상품 등록하기</div>
      <img
        src={image?.url}
        alt="상품 이미지 미리보기"
        className={styles.thumbnail}
      />
      <label
        htmlFor="merchandiseInput"
        className={styles.inputLabel}
      >
        상품 이미지 첨부하기
        <input
          type="file"
          name="썸네일 이미지 첨부"
          id="merchandiseInput"
          onChange={handleUploadImage}
          className={styles.input}
          accept="image/jpeg, image/png, image/webp, image/gif"
        />
      </label>
      <Label name="상품 이름">
        <input
          className={styles.textInput}
          type="text"
          name="상품 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Label>
      <Label name="상품 가격">
        <input
          className={styles.textInput}
          type="text"
          name="상품 가격"
          value={price || ''}
          onChange={(e) => {
            if (/^[0-9]*$/g.test(e.target.value)) {
              setPrice(Number(e.target.value));
            }
          }}
        />
      </Label>
      <Label name="상품 수량">
        <input
          className={styles.textInput}
          type="text"
          name="상품 수량"
          value={count || ''}
          onChange={(e) => {
            if (/^[0-9]*$/g.test(e.target.value)) {
              setCount(Number(e.target.value));
            }
          }}
        />
      </Label>
      <Button
        style={{
          backgroundColor: '#567ace',
          color: '#fff',
        }}
        onClick={handleAddMerchandise}
      >
        상품 추가
      </Button>
      {merchandises.length > 0 && <div className={styles.title}>추가한 상품 목록</div>}
      <ul className={styles.merchandiseList}>
        {merchandises.map((m, index) => (
          <li
            key={m.name}
            className={styles.merchandise}
          >
            <img
              src={m.image.url}
              alt={`${m.name} 이미지`}
              className={styles.thumbnail}
            />
            <div className={styles.merchandiseName}>{m.name}</div>
            <div className={styles.info}>
              <span className={styles.section}>가격</span>
              <span>
                {NumberToMoney(m.price)}
                {' '}
                원
              </span>
            </div>
            <div className={styles.info}>
              <span className={styles.section}>수량</span>
              <span>
                {m.count}
                {' '}
                개
              </span>
            </div>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleDeleteMerchandise(index)}
            >
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <line x1="2" y1="2" x2="14" y2="14" stroke="black" strokeWidth="2" />
                <line x1="14" y1="2" x2="2" y2="14" stroke="black" strokeWidth="2" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
