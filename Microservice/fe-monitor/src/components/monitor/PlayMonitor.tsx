import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';
import styles from '../styles/PlayMonitor.module.css';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getPlayMonitorData } from '../../apis/ticket';
import { Seat } from '../../utils/type';

interface PlayMonitorProps {
  namespace: string;
  seatData: Seat[];
}

export default function PlayMonitor({
  namespace,
  seatData,
}: PlayMonitorProps) {
  const [ticketData, setTicketData] = useState(null);
  const [recentDates, setRecentDates] = useState<string[]>(null);
  const [totalSeatCount, setTotalSeatCount] = useState<number>(null);
  const [reservedSeatCount, setReservedSeatCount] = useState<number>(null);
  const [sectionData, setSectionData] = useState<{
    section: string;
    data: number;
  }[]>(null);
  const [dateData, setDateData] = useState<[string, number][]>([]);

  useEffect(() => {
    const now = new Date(Date.now());
    now.setDate(now.getDate() + 1);

    const recentDateArray = [...new Array(7)].map(() => {
      now.setDate(now.getDate() - 1);

      const monthString = now.getMonth() + 1;
      const dateString = now.getDate();

      return `${now.getFullYear()}-${monthString < 10 ? `0${monthString}` : monthString}-${dateString < 10 ? `0${dateString}` : dateString}`;
    }).reverse();

    setRecentDates(recentDateArray);
  }, []);

  useEffect(() => {
    if (namespace && recentDates) {
      fetchWithHandler(() => getPlayMonitorData(namespace), {
        onSuccess: (response) => {
          const dataResult = response.data.tickets.filter((d) => d.namespace === namespace);

          let acc = 0;
          const dateDataResult: [string, number][] = recentDates.map((currentDate) => {
            const cur = dataResult.filter((d) => d.purchaseDate === currentDate).length;
            const count = acc + cur;
            acc += cur;

            return [
              currentDate,
              count,
            ];
          });

          setTicketData(dataResult);
          setDateData(dateDataResult);
        },
        onError: () => {},
      });
    }
  }, [namespace, recentDates]);

  useEffect(() => {
    if (ticketData && seatData) {
      setTotalSeatCount(seatData.reduce((acc, cur) => acc + cur.count, 0));
      setReservedSeatCount(ticketData.length);
      setSectionData(seatData.map((currentSection) => ({
        section: currentSection.section,
        data: ticketData.filter((d) => d.section === currentSection.section).length,
      })));
    }
  }, [ticketData, seatData]);

  if (Number.isNaN(Number(totalSeatCount))
    || Number.isNaN(Number(reservedSeatCount))
    || !sectionData
    || !dateData) {
    return (
      <div>
        데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <div className={styles.dashboardContainer}>
          <div className={styles.dashboardTitle}>좌석 예매 현황</div>
          <ResponsivePie
            data={[
              {
                id: '예매됨',
                value: reservedSeatCount,
              },
              {
                id: '예매되지 않음',
                value: totalSeatCount - reservedSeatCount,
              },
            ]}
            theme={{
              text: {
                fontFamily: 'NotoSansKR',
              },
              tooltip: {
                container: {
                  fontFamily: 'NotoSansKR',
                },
              },
            }}
            colors={['#567ace', '#b0b0b0']}
            margin={{
              top: 0, right: 64, bottom: 32, left: 64,
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  0.2,
                ],
              ],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  2,
                ],
              ],
            }}
          />
        </div>
        <div className={styles.dashboardContainer}>
          <div className={styles.dashboardTitle}>구역 별 예매 현황</div>
          <ResponsiveBar
            data={sectionData}
            keys={[
              'data',
            ]}
            theme={{
              text: {
                fontFamily: 'NotoSansKR',
              },
              tooltip: {
                container: {
                  fontFamily: 'NotoSansKR',
                },
              },
            }}
            indexBy="section"
            margin={{
              top: 32, right: 32, bottom: 96, left: 48,
            }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            borderColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  1.6,
                ],
              ],
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  1.6,
                ],
              ],
            }}
            axisLeft={{
              format: (data) => (Math.floor(data) === data ? data : ''),
            }}
          />
        </div>
      </div>
      <div className={styles.dateDashboardContainer}>
        <div className={styles.dashboardTitle}>일자 별 누적 예매 현황</div>
        <ResponsiveLine
          data={[
            {
              id: '예매 현황',
              data: dateData.map(([date, value]) => ({
                x: date,
                y: value,
              })),
            },
          ]}
          margin={{
            top: 32, right: 48, bottom: 96, left: 64,
          }}
          pointSize={8}
          useMesh
          xScale={{ type: 'point' }}
          axisBottom={{
            tickPadding: 5,
            tickRotation: 0,
          }}
          yScale={{
            type: 'linear',
            min: 0,
            max: totalSeatCount,
          }}
          axisLeft={{
            tickPadding: 5,
            tickRotation: 0,
          }}
          theme={{
            text: {
              fontFamily: 'NotoSansKR',
            },
            tooltip: {
              container: {
                fontFamily: 'NotoSansKR',
              },
            },
          }}
          areaOpacity={0.5}
        />
      </div>
    </div>
  );
}
