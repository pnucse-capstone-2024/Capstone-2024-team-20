import { validImageSize, validImageType } from '../../utils/image';
import styles from '../styles/UploadThumbnailImage.module.css';
import { Image } from '../../utils/type';

interface UploadThumbnailImageProps {
  image: Image;
  setImage: React.Dispatch<React.SetStateAction<Image>>;
}

export default function UploadThumbnailImage({ image, setImage }: UploadThumbnailImageProps) {
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

      const url = URL.createObjectURL(fileList[0]);

      setImage({
        data: fileList[0],
        ext: fileList[0].type.split('/')[1],
        url,
      });
    }
  };

  return (
    <div className={styles.container}>
      {image?.url ? (
        <img
          src={image?.url}
          alt="썸네일 이미지 미리보기"
          className={styles.thumbnail}
        />
      )
        : (
          <div
            className={styles.thumbnail}
          />
        )}
      <label
        htmlFor="thumbnailInput"
        className={styles.inputLabel}
      >
        공연 썸네일 이미지 첨부하기
        <input
          type="file"
          name="썸네일 이미지 첨부"
          id="thumbnailInput"
          onChange={handleUploadImage}
          className={styles.input}
          accept="image/jpeg, image/png, image/webp, image/gif"
        />
      </label>
    </div>
  );
}
