import styles from '../styles/TicketingResult.module.css';
import { numberToMoney } from '../../utils/convert';
import Button from '../common/Button';

export default function MerchandiseResult({ result }: { result: {
  name: string;
  price: number;
  count: number;
}[] }) {
  const handleHome = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>구매가 완료되었습니다.</div>
      <div className={styles.result}>
        <div>
          총
          {' '}
          {result.reduce((acc, cur) => acc + cur.count, 0)}
          {' '}
          개
        </div>
        <div>
          {numberToMoney(result.reduce((acc, cur) => acc + cur.price, 0))}
          {' '}
          원
        </div>
      </div>
      <div className={styles.ticketList}>
        <div className={styles.category}>
          <div className={styles.eventTime}>상품명</div>
          <div className={styles.section}>수량</div>
          <div className={styles.price}>가격</div>
        </div>
        <ul>
          {result.map(({
            name, count, price,
          }) => (
            <li
              key={name}
              className={styles.ticket}
            >
              <div className={styles.eventTime}>{name}</div>
              <div className={styles.section}>{count}</div>
              <div className={styles.price}>{numberToMoney(price)}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.home}>
        <Button onClick={handleHome}>공연 페이지로</Button>
      </div>
    </div>
  );
}
