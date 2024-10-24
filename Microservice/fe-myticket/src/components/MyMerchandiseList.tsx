import { Merchandise } from '../utils/type';
import MyMerchandise from './MyMerchandise';
import styles from './styles/MyMerchandiseList.module.css';

interface MyMerchandiseListProps {
  eventNameList: string[];
  merchandiseNameList: string[];
  merchandiseData: Merchandise[];
}

export default function MyMerchandiseList({
  eventNameList,
  merchandiseNameList,
  merchandiseData,
}: MyMerchandiseListProps) {
  return (
    <div className={styles.container}>
      {eventNameList.map((eventName) => (
        <ul key={eventName}>
          <div className={styles.eventName}>{eventName}</div>
          {merchandiseNameList.map((merchandiseName) => {
            const merchandise = merchandiseData.find((m) => m.name === merchandiseName
              && m.eventName === eventName);

            if (merchandise) {
              const count = merchandiseData.filter((m) => m.name === merchandiseName
                && m.eventName === eventName).length;

              return (
                <li key={`${eventName}-${merchandiseName}`}>
                  <MyMerchandise
                    merchandiseData={{
                      image: merchandise.image,
                      name: merchandise.name,
                      count,
                      price: merchandise.price * count,
                    }}
                  />
                </li>
              );
            }

            return null;
          })}
        </ul>
      ))}
    </div>
  );
}
