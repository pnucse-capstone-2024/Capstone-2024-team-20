import { useEffect, useState } from 'react';
import PlayDetailHeader from '../components/ticket/PlayDetailHeader';
import { getEvent } from '../apis/event';
import { fetchWithHandler } from '../utils/fetchWithHandler';
import { Tab, Ticket, TicketingPlayDetail } from '../utils/type';
import PlayDetailContent from '../components/ticket/PlayDetailContent';
import styles from './styles/PlayTicketingPage.module.css';
import Ticketing from '../components/ticket/Ticketing';
import TicketBasket from '../components/ticket/TicketBasket';
import TicketingResult from '../components/ticket/TicketingResult';
import useTitle from '../hooks/useTitle';
import TicketingTab from '../components/ticket/TicketingTab';
import MerchandiseBasket from '../components/ticket/MerchandiseBasket';
import MerchandiseResult from '../components/ticket/MerchandiseResult';

export default function PlayTicketingPage() {
  const [playData, setPlayData] = useState<TicketingPlayDetail>(null);
  const [error, setError] = useState<boolean>(false);
  const [tab, setTab] = useState<Tab>('info');
  const [ticketResult, setTicketResult] = useState<Ticket[]>(null);
  const [merchandiseResult, setMerchandiseResult] = useState(null);

  const namespace = window.location.pathname.split('/')[1];

  useTitle(`${playData?.name || '공연'} | Clove 티켓`);

  useEffect(() => {
    // Do not use like this in production
    // ====================================
    const ticketResultStr = localStorage.getItem('ticketTemp');
    localStorage.removeItem('ticketTemp');

    const merchandiseResultStr = localStorage.getItem('merchandiseTemp');
    localStorage.removeItem('merchandiseTemp');

    if (ticketResultStr !== null) {
      setTicketResult(JSON.parse(ticketResultStr));
      // ====================================
    } else if (merchandiseResultStr !== null) {
      setMerchandiseResult(JSON.parse(merchandiseResultStr));
    } else {
      fetchWithHandler(() => getEvent(namespace), {
        onSuccess: (response) => {
          setPlayData(response.data[0]);
        },
        onError: () => {
          setError(true);
        },
      });
    }
  }, [namespace]);

  if (ticketResult !== null) {
    return <TicketingResult result={ticketResult} />;
  }

  if (merchandiseResult !== null) {
    return <MerchandiseResult result={merchandiseResult} />;
  }

  if (error) {
    return (
      <main>
        오류가 발생했습니다. 다시 시도해주세요.
      </main>
    );
  }

  return (
    <main>
      <PlayDetailHeader data={playData} />
      <TicketingTab
        tab={tab}
        setTab={setTab}
      />
      {tab === 'info'
        && (
        <PlayDetailContent
          data={playData?.description}
        />
        )}
      {tab === 'ticket'
        && (
        <div className={styles.ticketingContainer}>
          <Ticketing
            namespace={namespace}
            venue={playData.venue}
            eventName={playData.name}
            eventTimeList={playData.eventTime}
          />
          <TicketBasket
            namespace={namespace}
          />
        </div>
        )}
      {tab === 'merchandise'
        && (
        <MerchandiseBasket
          namespace={namespace}
          eventName={playData.name}
          merchandiseList={playData.merches}
        />
        )}
    </main>
  );
}
