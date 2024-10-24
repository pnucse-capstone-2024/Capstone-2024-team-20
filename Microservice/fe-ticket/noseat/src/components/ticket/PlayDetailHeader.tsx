import { numberToMoney } from '../../utils/convert';
import { TicketingPlayDetail } from '../../utils/type';
import Button from '../common/Button';
import Loading from '../common/Loading';
import styles from '../styles/PlayDetailHeader.module.css';

interface PlayDetailHeaderProps {
  type: 'detail' | 'ticketing';
  data: TicketingPlayDetail;
  setIsTicketing: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PlayDetailHeader({
  type,
  data,
  setIsTicketing,
}: PlayDetailHeaderProps) {
  if (!data) {
    return (
      <Loading />
    );
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.thumbnail}
        src={data.image}
        alt={`${data.name} 썸네일`}
      />
      <div className={styles.contentContainer}>
        <div className={styles.left}>
          <div className={styles.titleDate}>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={styles.date}>
              <p>
                {data.startDate}
                {' '}
                ~
                {' '}
                {data.endDate}
              </p>
            </div>
          </div>
          <div className={styles.venueCast}>
            <p>
              공연 장소:
              {' '}
              {data.venue}
            </p>
            <p>
              출연진:
              {' '}
              {data.cast}
            </p>
          </div>
          <div>
            <div className={styles.eventTimeTitle}>회차정보</div>
            <ul>
              {data.eventTime.map((evt, index) => (
                <li
                  key={evt.toString()}
                  className={styles.eventTime}
                >
                  {index + 1}
                  회차:
                  {' '}
                  {evt}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.middle}>
          <div>
            <div className={styles.priceTitle}>좌석 별 가격</div>
            <ul>
              {data.seatsAndPrices.map(({ id: sectionId, section, price }) => (
                <li
                  key={sectionId}
                  className={styles.price}
                >
                  {section}
                  {' '}
                  구역:
                  {' '}
                  {numberToMoney(price)}
                  {' '}
                  원
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.bookingDate}>
            <p>
              예매 시작일:
              {' '}
              {data.bookingStartDate}
            </p>
            <p>
              예매 종료일:
              {' '}
              {data.bookingEndDate}
            </p>
          </div>
          {type === 'detail'
            && (
            <div className={styles.book}>
              <Button onClick={() => {
                if (localStorage.getItem('userType') === 'PROVIDER') {
                  alert('예매자 전용 기능입니다.');
                } else if (localStorage.getItem('userType') === 'CLIENT') {
                  setIsTicketing(true);
                } else {
                  alert('로그인이 필요합니다.');
                  window.location.href = process.env.NODE_ENV === 'production'
                    ? 'http://cse.ticketclove.com/page/main/login'
                    : 'http://localhost:3000/page/main/login';
                }
              }}
              >
                예매하기
              </Button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
