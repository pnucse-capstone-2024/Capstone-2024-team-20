import { buySeats } from '../../apis/seat';
import { numberToMoney } from '../../utils/convert';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import Button from '../common/Button';
import styles from '../styles/TicketBasket.module.css';
import useTicket from '../../hooks/useTicket';
import useTicketDispatch from '../../hooks/useTicketDispatch';
import { TicketBuy } from '../../utils/type';

interface TicketBasketProps {
  namespace: string;
  ticketInfo: Map<string, {
    price: number;
    remainCount: number;
  }>;
  eventName: string;
}

export default function TicketBasket({
  namespace,
  ticketInfo,
  eventName,
}: TicketBasketProps) {
  const tickets = useTicket();
  const ticketDispatch = useTicketDispatch();

  const handleBuyTickets = () => {
    console.log(tickets);

    fetchWithHandler(() => buySeats({
      namespace,
      tickets: Array.from(tickets).map(([key, value]) => {
        const [eventTime, section] = key.split('#');
        const count = value;

        const result: TicketBuy[] = [];
        for (let i = 0; i < count; i += 1) {
          result.push({
            eventName,
            section,
            price: ticketInfo.get(`${eventTime}#${section}`).price,
            eventTime,
          });
        }

        return result;
      }).flat(),
    }), {
      onSuccess: async (response) => {
        console.log(response);
        localStorage.setItem('ticketTemp', JSON.stringify(Array.from(tickets).map(([left, count]) => {
          const [eventTime, section] = left.split('#');

          return {
            eventTime,
            section,
            price: ticketInfo.get(`${eventTime}#${section}`).price * count,
            count,
          };
        })));

        if (response.data?.kakaoReadyResponse) {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

          if (isMobile) {
            window.location.href = response.data.kakaoReadyResponse.next_redirect_mobile_url;
          } else {
            window.location.href = response.data.kakaoReadyResponse.next_redirect_pc_url;
          }
        } else {
          alert('구매가 완료되었습니다.');
          window.location.reload();
        }
      },
      onError: () => {
        alert('구매에 실패하였습니다.');
      },
    });
  };

  const handleAddTicket = (eventTime, section) => {
    const keyStr = `${eventTime}#${section}`;
    if (tickets.get(keyStr) < ticketInfo.get(keyStr).remainCount) {
      ticketDispatch({
        type: 'ADD',
        payload: {
          eventTime,
          section,
        },
      });
    }
  };

  const handleRemoveTicket = (eventTime, section) => {
    ticketDispatch({
      type: 'REMOVE',
      payload: {
        eventTime,
        section,
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
        <div className={styles.count}>
          수량
        </div>
        <div className={styles.price}>
          가격
        </div>
      </div>
      <ul className={styles.ticketList}>
        {tickets && Array.from(tickets).map(([key, value]) => {
          const [eventTime, section] = key.split('#');

          return (
            <li
              key={`${eventTime}-${section}`}
              className={styles.ticketInfo}
            >
              <div className={styles.eventDate}>
                <div>{eventTime}</div>
                <div className={styles.remain}>
                  {ticketInfo.get(`${eventTime}#${section}`).remainCount}
                  {' '}
                  개 남음
                </div>
              </div>
              <div className={styles.section}>
                {section}
              </div>
              <button
                type="button"
                className={styles.button}
                onClick={() => handleAddTicket(eventTime, section)}
              >
                <svg width="16" height="16" viewBox="0 0 100 100">
                  <line x1="50" y1="20" x2="50" y2="80" stroke="black" strokeWidth="10" />
                  <line x1="20" y1="50" x2="80" y2="50" stroke="black" strokeWidth="10" />
                </svg>
              </button>
              <div className={styles.countValue}>
                {value}
              </div>
              <button
                type="button"
                className={styles.button}
                onClick={() => handleRemoveTicket(eventTime, section)}
              >
                <svg width="16" height="16" viewBox="0 0 100 100">
                  <line x1="20" y1="50" x2="80" y2="50" stroke="black" strokeWidth="10" />
                </svg>
              </button>
              <div className={styles.ticketPrice}>
                {numberToMoney(value * ticketInfo.get(`${eventTime}#${section}`).price)}
                {' '}
                원
              </div>
            </li>
          );
        })}
      </ul>
      {tickets && (
        <div className={styles.total}>
          <div>
            총
            {' '}
            {Array.from(tickets).reduce((acc, cur) => acc + cur[1], 0)}
            {' '}
            매
          </div>
          <div>
            {numberToMoney(Array.from(tickets).reduce((acc, [key, value]) => {
              const [eventTime, section] = key.split('#');

              return acc + (value * ticketInfo.get(`${eventTime}#${section}`).price);
            }, 0))}
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
