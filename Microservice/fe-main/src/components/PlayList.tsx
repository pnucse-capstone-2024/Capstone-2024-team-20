import { Play } from '../utils/type';
import PlayCard from './PlayCard';
import styles from './styles/PlayList.module.css';

interface PlayListProps {
  playCards: Play[];
}

export default function PlayList({ playCards }: PlayListProps) {
  return (
    <ul className={styles.container}>
      {playCards.map((playCard) => playCard && (
      <li key={playCard.namespace}>
        <PlayCard
          id={playCard.id}
          image={playCard.image}
          namespace={playCard.namespace}
          name={playCard.name}
          venue={playCard.venue}
          startDate={playCard.startDate}
          endDate={playCard.endDate}
        />
      </li>
      ))}
    </ul>
  );
}
