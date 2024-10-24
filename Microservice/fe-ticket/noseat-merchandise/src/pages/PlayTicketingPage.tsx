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
import useTicketDispatch from '../hooks/useTicketDispatch';
import TicketingTab from '../components/ticket/TicketingTab';
import MerchandiseBasket from '../components/ticket/MerchandiseBasket';
import MerchandiseResult from '../components/ticket/MerchandiseResult';
import { getSeats } from '../apis/seat';

export default function PlayTicketingPage() {
  const [playData, setPlayData] = useState<TicketingPlayDetail>(null);
  const [error, setError] = useState<boolean>(false);
  const [tab, setTab] = useState<Tab>('info');
  const [ticketResult, setTicketResult] = useState<Ticket[]>(null);
  const [merchandiseResult, setMerchandiseResult] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);

  const namespace = window.location.pathname.split('/')[1];

  const ticketDispatch = useTicketDispatch();

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

  useEffect(() => {
    if (playData) {
      fetchWithHandler(() => getSeats(namespace), {
        onSuccess: (response) => {
          const filteredResult = response.data.filter((s) => s.eventName === playData.name);

          const eventTimeList = [...new Set([...filteredResult.map((s) => s.eventTime)])];
          const sectionList = [...new Set([...filteredResult.map((s) => s.section)])];

          const ticketData = eventTimeList.map((et, eti) => sectionList.map((s, si) => ({
            id: eti * sectionList.length + si,
            eventTime: et,
            section: s,
            price: filteredResult.find((r) => r.section === s).price,
            remainCount: filteredResult.filter((r) => r.eventTime === et && r.section === s && r.reservationStatus === 'NO').length,
          }))).flat();

          setTicketInfo(ticketData);
        },
        onError: () => {},
      });
    }
  }, [namespace, playData]);

  useEffect(() => {
    if (ticketInfo) {
      ticketInfo.forEach((t) => {
        ticketDispatch({
          type: 'INIT',
          payload: {
            eventTime: t.eventTime,
            section: t.section,
          },
        });
      });
    }
  }, [ticketInfo]);

  useEffect(() => {
    if (playData) {
      playData.eventTime.forEach((et) => {
        playData.seatsAndPrices.forEach(({
          section,
        }) => {
          ticketDispatch({
            type: 'INIT',
            payload: {
              eventTime: et,
              section,
            },
          });
        });
      });
    }
  }, [playData]);

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
            venue={playData.venue}
          />
          <TicketBasket
            namespace={namespace}
            eventName={playData.name}
            ticketInfo={new Map(ticketInfo.map(({
              eventTime,
              section,
              price,
              remainCount,
            }) => [`${eventTime}#${section}`, {
              price,
              remainCount,
            }]))}
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
