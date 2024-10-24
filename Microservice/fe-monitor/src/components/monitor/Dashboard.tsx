import { PointTooltipProps, ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import { Metric } from '../../utils/type';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { rangeQuery } from '../../apis/monitor';

interface DashboardProps {
  title: string;
  metricType: string;
  enableSlices: boolean;
  namespace: string;
  autoRefresh: boolean;
  start: number;
  end: number;
  step: string;
  yFormat: string;
  yMax: number;
}

function Tooltip({ point }: PointTooltipProps) {
  return (
    <div className={styles.tooltipContainer}>
      <div>{point.id}</div>
      <div>{point.data.xFormatted}</div>
      <div>{point.data.yFormatted}</div>
    </div>
  );
}

export default function Dashboard({
  title,
  metricType,
  enableSlices,
  namespace,
  autoRefresh,
  start,
  end,
  step,
  yFormat,
  yMax,
}: DashboardProps) {
  const [data, setData] = useState<Metric[]>(null);

  useEffect(() => {
    if (!start || !end || !step) {
      return;
    }

    fetchWithHandler(() => rangeQuery({
      namespace,
      metric: metricType,
      start,
      end,
      step,
    }), {
      onSuccess: (response) => {
        setData(response.data.map(({ metric, values }) => ({
          name: metric.pod,
          values: values.map(([x, y]) => [x, Number(y)]),
        })));
      },
      onError: () => {},
    });
  }, [namespace, metricType, start, end, step]);

  if (!data || data.length < 1) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.error}>데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      style={{
        height: `${360 + data.length * 32}px`,
      }}
    >
      <div className={styles.title}>{title}</div>
      <ResponsiveLine
        data={data.map(({ name, values }) => ({
          id: name.split('-deployment')[0],
          data: values.map(([x, y]) => {
            const date = new Date(Number(x) * 1000);

            const minute = date.getMinutes();
            const second = date.getSeconds();

            const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
            const secondString = second < 10 ? `0${second}` : `${second}`;

            return {
              x: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${minuteString}:${secondString}`,
              y: (Number(y)).toFixed(2),
            };
          }),
        }))}
        margin={{
          top: 32, right: 32, bottom: data.length * 25, left: 64,
        }}
        pointSize={8}
        useMesh
        xScale={{ type: 'point' }}
        axisBottom={{
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => value.split(' ')[1],
        }}
        yScale={{
          type: 'linear',
          min: 0,
          max: yMax,
        }}
        yFormat={(value) => `${value}${yFormat}`}
        axisLeft={{
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => `${value}${yFormat}`,
        }}
        // enableArea
        // curve="monotoneX"
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
        enableSlices={enableSlices ? 'x' : false}
        tooltip={Tooltip}
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: false,
            translateX: -32,
            translateY: data.length * 25,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, 0.2)',
            symbolBorderWidth: 1,
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
