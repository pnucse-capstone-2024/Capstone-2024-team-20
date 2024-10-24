import {
  MiniMap, TransformComponent, TransformWrapper, useControls,
} from 'react-zoom-pan-pinch';
import styles from '../styles/Ticketing.module.css';
import { venueData } from '../../data/venue';

interface TicketingProps {
  venue: string;
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
  // namespace,
  // eventName,
  venue,
}: TicketingProps) {
  // const [seats, setSeats] = useState<SeatInfo[]>([]);
  const currentVenue = venueData.find((v) => v.name === venue);

  // useEffect(() => {
  //   fetchWithHandler(() => getSeats(namespace), {
  //     onSuccess: (response) => {
  //       setSeats(response.data.filter((d) => d.eventName === eventName));
  //     },
  //     onError: () => {},
  //   });
  // }, [eventName, namespace]);

  return (
    <div className={styles.container}>
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
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
