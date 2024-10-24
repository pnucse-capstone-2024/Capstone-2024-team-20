import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CategoryTitle from '../components/common/CategoryTitle';
import OwnerTab from '../components/deploy/OwnerTab';
import PlayMonitorWrapper from '../remotes/PlayMonitorWrapper';
import { fetchWithHandler } from '../utils/fetchWithHandler';
import { getEvent } from '../apis/event';
import { getSeat } from '../apis/seat';

export default function PlayMonitorPage() {
  document.title = '예매 현황 모니터링 | Clove 티켓';

  const { namespace } = useParams();
  const [eventName, setEventName] = useState(null);
  const [seatData, setSeatData] = useState(null);

  useEffect(() => {
    fetchWithHandler(() => getEvent(namespace), {
      onSuccess: (response) => {
        setEventName(response.data[0].name);
      },
      onError: () => {},
    });
  }, [namespace]);

  useEffect(() => {
    if (eventName !== null) {
      fetchWithHandler(() => getSeat(namespace), {
        onSuccess: (response) => {
          const result = response.data.filter((s) => s.eventName === eventName);
          // console.log(result);

          const sectionList = [...new Set([...result.map((r) => r.section)])];
          // console.log(sectionList);

          const sectionCount = sectionList.map((s, i) => ({
            id: i,
            section: s,
            count: result.filter((r) => r.section === s).length,
          }));
          // console.log(sectionCount);

          setSeatData(sectionCount);
        },
        onError: () => {},
      });
    }
  }, [namespace, eventName]);

  return (
    <main>
      <OwnerTab
        namespace={namespace}
        current="PlayMonitor"
      />
      <CategoryTitle>예매 현황 모니터링</CategoryTitle>
      {seatData ? (
        <PlayMonitorWrapper
          namespace={namespace}
          seatData={seatData}
        />
      ) : (
        <div>
          예매 현황을 불러오지 못했습니다.
        </div>
      )}
    </main>
  );
}
