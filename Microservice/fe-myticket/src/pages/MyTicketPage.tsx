import { useEffect, useState } from 'react';
import CategoryTitle from '../components/common/CategoryTitle';
import MyTicketList from '../components/MyTicketList';
import {
  Merchandise, ReservedTicket, TabType,
} from '../utils/type';
import { fetchWithHandler } from '../utils/fetchWithHandler';
import { getMyTickets } from '../apis/ticket';
import { getMyMerchandise } from '../apis/merchandise';
import Tab from '../components/Tab';
import MyMerchandiseList from '../components/MyMerchandiseList';

export default function MyTicketPage() {
  document.title = '티켓 관리 | Clove 티켓';

  const [tab, setTab] = useState<TabType>('ticket');

  const [eventNameList, setEventNameList] = useState([]);
  const [merchandiseNameList, setMerchandiseNameList] = useState([]);
  const [merchandiseList, setMerchandiseList] = useState<Merchandise[]>([]);
  const [ticketList, setTicketList] = useState<ReservedTicket[]>([]);

  useEffect(() => {
    fetchWithHandler(() => getMyMerchandise(), {
      onSuccess: (response) => {
        const { data } = response;

        const eventNameListData = [...new Set(data.map((d) => d.eventName))].reverse();
        setEventNameList(eventNameListData);

        const merchandiseNameListData = [...new Set(data.map((d) => d.name))].reverse();
        setMerchandiseNameList(merchandiseNameListData);

        setMerchandiseList(data);
      },
      onError: () => {

      },
    });
  }, []);

  useEffect(() => {
    fetchWithHandler(() => getMyTickets(), {
      onSuccess: (response) => {
        setTicketList(response.data.reverse());
      },
      onError: () => {},
    });
  }, []);

  return (
    <main>
      <CategoryTitle>티켓 관리</CategoryTitle>
      <Tab
        tab={tab}
        setTab={setTab}
      />
      {tab === 'ticket' && (
      <MyTicketList
        tickets={ticketList}
      />
      )}
      {tab === 'merchandise' && (
      <MyMerchandiseList
        eventNameList={eventNameList}
        merchandiseNameList={merchandiseNameList}
        merchandiseData={merchandiseList}
      />
      )}
    </main>
  );
}
