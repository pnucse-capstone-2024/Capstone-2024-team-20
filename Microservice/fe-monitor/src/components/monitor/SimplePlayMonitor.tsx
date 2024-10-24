import { useEffect, useState } from 'react';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getPlayMonitorData } from '../../apis/ticket';
import ProgressBar from '../common/ProgressBar';
import styles from '../styles/SimplePlayMonitor.module.css';
import { getSeat } from '../../apis/seat';

interface SimplePlayMonitorProps {
  namespace: string;
  eventName: string;
}

export default function SimplePlayMonitor({
  namespace,
  eventName,
}: SimplePlayMonitorProps) {
  const [totalSeatCount, setTotalSeatCount] = useState<number>(null);
  const [reservedSeatCount, setReservedSeatCount] = useState<number>(null);

  useEffect(() => {
    if (namespace) {
      fetchWithHandler(() => getPlayMonitorData(namespace), {
        onSuccess: (response) => {
          setReservedSeatCount(response.data.tickets
            .filter((d) => d.namespace === namespace).length);
        },
        onError: () => {},
      });
    }
  }, [namespace]);

  useEffect(() => {
    if (eventName !== null) {
      fetchWithHandler(() => getSeat(namespace), {
        onSuccess: (response) => {
          setTotalSeatCount(response.data.filter((s) => s.eventName === eventName).length);
        },
        onError: () => {},
      });
    }
  }, [namespace, eventName]);

  if (reservedSeatCount === null || totalSeatCount === null) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>예매 현황</div>
        <div>
          {reservedSeatCount}
          {' '}
          /
          {' '}
          {totalSeatCount}
        </div>
      </div>
      <ProgressBar
        cur={reservedSeatCount}
        total={totalSeatCount}
      />
    </div>
  );
}
