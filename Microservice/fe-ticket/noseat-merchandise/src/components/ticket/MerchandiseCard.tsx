import { numberToMoney } from '../../utils/convert';
import { Merch, Merchandise } from '../../utils/type';
import styles from '../styles/MerchandiseCard.module.css';

interface MerchandiseCardProps {
  index: number;
  data: Merch;
  setCart: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function MerchandiseCard({
  index,
  data,
  setCart,
}: MerchandiseCardProps) {
  const handleAddCart = () => {
    setCart((prev) => {
      const newCart = [...prev];
      newCart[index] += 1;

      return newCart;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={data.image}
          alt={`${data.name} 이미지`}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.price}>
          {numberToMoney(data.price)}
          {' '}
          원
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>장바구니에 추가</span>
        </button>
      </div>
    </div>
  );
}
