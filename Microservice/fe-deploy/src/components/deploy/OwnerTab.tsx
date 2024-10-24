import { Link } from 'react-router-dom';
import styles from '../styles/OwnerTab.module.css';

interface OwnerTabProps {
  namespace: string;
  current: 'PlayDetail' | 'PlayMonitor' | 'ServerMonitor' | 'PlayConfiguration';
}

export default function OwnerTab({
  namespace,
  current,
}: OwnerTabProps) {
  return (
    <div className={styles.container}>
      <Link
        className={`${styles.tab} ${current === 'PlayDetail' && styles.current}`}
        to={`/owner/playDetail/${namespace}`}
      >
        공연 상세 정보
      </Link>
      <Link
        className={`${styles.tab} ${current === 'PlayMonitor' && styles.current}`}
        to={`/owner/playMonitor/${namespace}`}
      >
        예매 현황 모니터링
      </Link>
      <Link
        className={`${styles.tab} ${current === 'ServerMonitor' && styles.current}`}
        to={`/owner/serverMonitor/${namespace}`}
      >
        공연 서버 모니터링
      </Link>
      <Link
        className={`${styles.tab} ${current === 'PlayConfiguration' && styles.current}`}
        to={`/owner/playConfiguration/${namespace}`}
      >
        공연 수정
      </Link>
    </div>
  );
}
