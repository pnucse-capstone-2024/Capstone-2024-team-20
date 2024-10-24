import { DeployedPlay } from '../../utils/type';
import DeployedPlayCard from './DeployedPlayCard';

interface DeployedPlayListProps {
  deployedPlays: DeployedPlay[];
}

export default function DeployedPlayList({ deployedPlays }: DeployedPlayListProps) {
  if (deployedPlays && deployedPlays.length < 1) {
    return (
      <div>배포한 공연이 없습니다.</div>
    );
  }

  return (
    <ul>
      {deployedPlays.map((deployedPlay) => deployedPlay && (
        <li key={deployedPlay.id}>
          <DeployedPlayCard
            id={deployedPlay.id}
            namespace={deployedPlay.namespace}
            image={deployedPlay.image}
            name={deployedPlay.name}
            bookingStartDate={deployedPlay.bookingStartDate}
            bookingEndDate={deployedPlay.bookingEndDate}
            seatsAndPrices={deployedPlay.seatsAndPrices}
          />
        </li>
      ))}
    </ul>
  );
}
