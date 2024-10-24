import { refundTicket } from '../apis/ticket';
import { numberToMoney } from '../utils/convert';
import { fetchWithHandler } from '../utils/fetchWithHandler';
import { ReservedTicket } from '../utils/type';
import styles from './styles/MyTicket.module.css';

export default function MyTicket({
  eventTime,
  purchaseDate,
  purchaseTime,
  seatNumber,
  eventName,
  price,
  section,
  tid,
  namespace,
}: ReservedTicket) {
  const handleCancelTicket = () => {
    const ticketToRefund: ReservedTicket = {
      eventName,
      section,
      seatNumber,
      price,
      eventTime,
      purchaseDate,
      purchaseTime,
      tid,
      namespace,
    };

    fetchWithHandler(() => refundTicket({
      namespace,
      ticket: ticketToRefund,
    }), {
      onSuccess: (response) => {
        console.log(response);
        alert('예매 취소가 완료되었습니다.');
        window.location.reload();
      },
      onError: (error) => {
        console.error(error);
        alert('예매 취소에 실패하였습니다.');
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.eventName}>{eventName}</div>
      <div className={styles.info}>
        <div className={styles.infoTitle}>공연 일자</div>
        <div>{eventTime}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoTitle}>구역</div>
        <div>{section}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoTitle}>좌석 번호</div>
        <div>{seatNumber}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoTitle}>예매 일자</div>
        <div>
          {purchaseDate}
          {' '}
          {purchaseTime}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoTitle}>예매 가격</div>
        <div>{numberToMoney(price)}</div>
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={handleCancelTicket}
      >
        예매 취소
      </button>
    </div>
  );
}
