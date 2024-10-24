import { numberToMoney } from '../../utils/convert';
import { TicketingPlayDetail } from '../../utils/type';
import Loading from '../common/Loading';
import styles from '../styles/PlayDetailHeader.module.css';

interface PlayDetailHeaderProps {
  data: TicketingPlayDetail;
}

export default function PlayDetailHeader({ data }: PlayDetailHeaderProps) {
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
        </div>
      </div>
    </div>
  );
}
