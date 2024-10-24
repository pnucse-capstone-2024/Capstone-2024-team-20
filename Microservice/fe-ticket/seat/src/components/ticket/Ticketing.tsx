import {
  MiniMap, TransformComponent, TransformWrapper, useControls,
} from 'react-zoom-pan-pinch';
import { useEffect, useState } from 'react';
import Seat from './Seat';
import { SeatInfo } from '../../utils/type';
import styles from '../styles/Ticketing.module.css';
import { venueData } from '../../data/venue';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { getSeats } from '../../apis/seat';

interface TicketingProps {
  namespace: string;
  eventName: string;
  venue: string;
  eventTimeList: string[];
}

function Controller() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className={styles.controllerContainer}>
      <button type="button" onClick={() => zoomIn()}>+</button>
      <button type="button" onClick={() => zoomOut()}>-</button>
      <button type="button" onClick={() => resetTransform()}>reset</button>
    </div>
  );
}

export default function Ticketing({
  namespace,
  eventName,
  venue,
  eventTimeList,
}: TicketingProps) {
  const [seats, setSeats] = useState<SeatInfo[]>([]);
  const currentVenue = venueData.find((v) => v.name === venue);
  const [selectedEventTime, setSelectedEventTime] = useState<string>('');

  useEffect(() => {
    fetchWithHandler(() => getSeats(namespace), {
      onSuccess: (response) => {
        setSeats(response.data.filter((d) => d.eventName === eventName));
      },
      onError: () => {},
    });
  }, [eventName, namespace]);

  return (
    <div className={styles.container}>
      <select
        onChange={(e) => setSelectedEventTime(e.target.value)}
        value={selectedEventTime}
      >
        <option
          key="eventtimenotselected"
          value=""
        >
          회차를 선택하세요
        </option>
        {eventTimeList.map((et) => (
          <option
            key={et}
            value={et}
          >
            {et}
          </option>
        ))}
      </select>
      <TransformWrapper
        doubleClick={{
          disabled: true,
        }}
        minScale={0.5}
        maxScale={4}
        limitToBounds={false}
      >
        {({
          zoomIn, zoomOut, resetTransform, ...rest
        }) => (
          <>
            <Controller />
            <TransformComponent>
              <img
                src={currentVenue.backgroundImage}
                alt="공연장 이미지"
                style={{
                  width: currentVenue.imageSize.width,
                  height: currentVenue.imageSize.height,
                }}
              />
              <svg className={styles.seat}>
                {seats.filter((s) => s.eventTime === selectedEventTime).map(({
                  id,
                  section,
                  seatNumber,
                  price,
                  reservationStatus,
                  eventTime,
                }) => {
                  const { x, y } = currentVenue
                    .sections
                    .find((s) => s.sectionName === section)
                    .seats[seatNumber - 1];

                  return (
                    <Seat
                      key={`${id}-${eventTime}-${section}-${seatNumber}`}
                      id={id}
                      eventName={eventName}
                      x={x}
                      y={y}
                      section={section}
                      seatNumber={seatNumber}
                      price={price}
                      reservationStatus={reservationStatus}
                      eventTime={eventTime}
                    />
                  );
                })}
              </svg>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
