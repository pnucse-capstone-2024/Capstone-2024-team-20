import { buySeats } from '../../apis/seat';
import useTicket from '../../hooks/useTicket';
import { numberToMoney } from '../../utils/convert';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import Button from '../common/Button';
import styles from '../styles/TicketBasket.module.css';

export default function TicketBasket({ namespace }: { namespace: string }) {
  const tickets = useTicket();

  const handleBuyTickets = () => {
    fetchWithHandler(() => buySeats({
      namespace,
      tickets,
    }), {
      onSuccess: async (response) => {
        console.log(response);
        localStorage.setItem('ticketTemp', JSON.stringify(tickets));

        if (response.data?.kakaoReadyResponse) {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

          if (isMobile) {
            window.location.href = response.data.kakaoReadyResponse.next_redirect_mobile_url;
          } else {
            window.location.href = response.data.kakaoReadyResponse.next_redirect_pc_url;
          }
        } else {
          alert('구매가 완료되었습니다.');
          window.location.href = process.env.NODE_ENV === 'production' ? './play/result' : './result';
        }
      },
      onError: () => {
        alert('구매에 실패하였습니다.');
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>선택한 좌석</div>
      <div className={styles.header}>
        <div className={styles.eventDate}>
          공연 일자
        </div>
        <div className={styles.section}>
          구역
        </div>
        <div className={styles.seatNumber}>
          좌석 번호
        </div>
        <div className={styles.price}>
          가격
        </div>
      </div>
      <ul className={styles.ticketList}>
        {tickets && tickets.map(({
          section,
          seatNumber,
          price,
          eventTime,
        }) => (
          <li
            key={`${eventTime}-${section}-${seatNumber}`}
            className={styles.ticketInfo}
          >
            <div className={styles.eventDate}>
              {eventTime}
            </div>
            <div className={styles.section}>
              {section}
            </div>
            <div className={styles.seatNumber}>
              {seatNumber}
            </div>
            <div className={styles.ticketPrice}>
              {numberToMoney(price)}
              {' '}
              원
            </div>
          </li>
        ))}
      </ul>
      {tickets && tickets.length > 0 && (
        <div className={styles.total}>
          <div>
            총
            {' '}
            {tickets.length}
            {' '}
            매
          </div>
          <div>
            {numberToMoney(tickets.reduce((acc, cur) => acc + cur.price, 0))}
            {' '}
            원
          </div>
        </div>
      )}
      <div className={styles.book}>
        <Button onClick={handleBuyTickets}>예매하기</Button>
      </div>
    </div>
  );
}
