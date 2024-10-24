import { Ticket } from '../../utils/type';
import styles from '../styles/TicketingResult.module.css';
import { numberToMoney } from '../../utils/convert';
import Button from '../common/Button';

export default function TicketingResult({ result }: { result: Ticket[] }) {
  const handleHome = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>예매가 완료되었습니다.</div>
      <div className={styles.result}>
        <div>
          총
          {' '}
          {result.length}
          {' '}
          매
        </div>
        <div>
          {numberToMoney(result.reduce((acc, cur) => acc + cur.price, 0))}
          {' '}
          원
        </div>
      </div>
      <div className={styles.ticketList}>
        <div className={styles.category}>
          <div className={styles.eventTime}>공연 일자</div>
          <div className={styles.section}>구역</div>
          <div className={styles.seatNumber}>좌석 번호</div>
          <div className={styles.price}>가격</div>
        </div>
        <ul>
          {result.map(({
            eventTime, section, seatNumber, price,
          }) => (
            <li
              key={`${eventTime}-${section}-${seatNumber}`}
              className={styles.ticket}
            >
              <div className={styles.eventTime}>{eventTime}</div>
              <div className={styles.section}>{section}</div>
              <div className={styles.seatNumber}>{seatNumber}</div>
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
