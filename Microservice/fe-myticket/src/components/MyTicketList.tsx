import styles from './styles/MyTicketList.module.css';
import { ReservedTicket } from '../utils/type';
import MyTicket from './MyTicket';

interface MyTicketListProps {
  tickets: ReservedTicket[];
}

export default function MyTicketList({ tickets }: MyTicketListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.ticketList}>
        {tickets.map(({
          eventTime,
          purchaseDate,
          purchaseTime,
          seatNumber,
          eventName,
          price,
          section,
          tid,
          namespace,
        }) => (
          <li
            key={`${namespace}-${eventName}-${eventTime}-${section}-${seatNumber}`}
            className={styles.ticket}
          >
            <MyTicket
              eventTime={eventTime}
              purchaseDate={purchaseDate}
              purchaseTime={purchaseTime}
              seatNumber={seatNumber}
              eventName={eventName}
              price={price}
              section={section}
              tid={tid}
              namespace={namespace}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
