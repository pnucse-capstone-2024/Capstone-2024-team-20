import { numberToMoney } from '../utils/convert';
import { ReservedMerchandise } from '../utils/type';
import styles from './styles/MyMerchandise.module.css';

interface MyMerchandiseProps {
  merchandiseData: ReservedMerchandise;
}

export default function MyMerchandise({
  merchandiseData,
}: MyMerchandiseProps) {
  return (
    <div className={styles.container}>
      <img
        src={merchandiseData.image}
        alt={`${merchandiseData.name} 이미지`}
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.infoTitle}>상품명</div>
        <div>{merchandiseData.name}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoTitle}>수량</div>
        <div>{merchandiseData.count}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoTitle}>가격</div>
        <div>{numberToMoney(merchandiseData.price)}</div>
      </div>
    </div>
  );
}
