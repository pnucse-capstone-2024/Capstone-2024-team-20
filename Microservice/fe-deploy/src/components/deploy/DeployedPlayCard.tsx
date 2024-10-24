import { Link } from 'react-router-dom';
import { DeployedPlay } from '../../utils/type';
import styles from '../styles/DeployedPlayCard.module.css';
import SimplePlayMonitorWrapper from '../../remotes/SimplePlayMonitorWrapper';

export default function DeployedPlayCard({
  namespace,
  image,
  name,
  bookingStartDate,
  bookingEndDate,
}: DeployedPlay) {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnailContainer}>
        <img
          src={image}
          alt={`${name} 썸네일`}
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link to={`./playDetail/${namespace}`}>
            <h2 className={styles.title}>{name}</h2>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.simpleMonitor}>
            <SimplePlayMonitorWrapper
              namespace={namespace}
              eventName={name}
            />
          </div>
          <div className={styles.dateInfo}>
            <div className={styles.bookingDate}>
              <div className={styles.sectionTitle}>예매 기간</div>
              <div>
                <span>{bookingStartDate}</span>
                <span>~</span>
                <span>{bookingEndDate}</span>
              </div>
            </div>
            <div className={styles.bold}>예매중</div>
          </div>
          {/* <div className={styles.date}>{deployDate.toLocaleDateString()}</div> */}
        </div>
      </div>
    </div>
  );
}
