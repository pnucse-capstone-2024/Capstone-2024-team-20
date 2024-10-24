import { useEffect, useState } from 'react';
import { SeatInfo } from '../../utils/type';
import useTicketDispatch from '../../hooks/useTicketDispatch';
import styles from '../styles/Seat.module.css';
import useTicket from '../../hooks/useTicket';

interface SeatProps extends SeatInfo {
  x: number;
  y: number;
  eventName: string;
}

export default function Seat({
  x,
  y,
  eventName,
  section,
  seatNumber,
  price,
  reservationStatus,
  eventTime,
}: SeatProps) {
  const [isSelected, setIsSelected] = useState(false);
  const tickets = useTicket();
  const ticketDispatch = useTicketDispatch();

  useEffect(() => {
    if (tickets.find((t) => t.eventTime === eventTime
      && t.eventName === eventName
      && t.section === section
      && t.seatNumber === seatNumber)) {
      setIsSelected(true);
    }
  }, []);

  const handleSelect = () => {
    ticketDispatch({
      type: 'ADD',
      payload: {
        eventName,
        section,
        seatNumber,
        eventTime,
        price,
      },
    });
    setIsSelected(true);
  };

  const handleUnSelect = () => {
    ticketDispatch({
      type: 'REMOVE',
      payload: {
        eventName,
        section,
        seatNumber,
        eventTime,
        price,
      },
    });
    setIsSelected(false);
  };

  if (reservationStatus === 'YES') {
    return (
      <circle
        className={styles.circleDisabled}
        cx={x}
        cy={y}
        r={8}
        fill="var(--color-gray)"
        strokeWidth={1}
      />
    );
  }

  if (!isSelected) {
    return (
      <circle
        className={styles.circle}
        cx={x}
        cy={y}
        r={8}
        fill="var(--color-blue)"
        stroke="#000"
        strokeWidth={1}
        onClick={handleSelect}
      />
    );
  }

  return (
    <circle
      className={styles.circle}
      cx={x}
      cy={y}
      r={8}
      fill="var(--color-green)"
      stroke="#000"
      strokeWidth={1}
      onClick={handleUnSelect}
    />
  );
}
