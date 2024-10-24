import { useParams } from 'react-router-dom';
import CategoryTitle from '../components/common/CategoryTitle';
import OwnerTab from '../components/deploy/OwnerTab';
import PlayDetail from '../components/deploy/PlayDetail';

export default function PlayDetailPage() {
  document.title = '공연 상세 정보 | Clove 티켓';

  const { namespace } = useParams();

  return (
    <main>
      <OwnerTab
        namespace={namespace}
        current="PlayDetail"
      />
      <CategoryTitle>공연 상세 정보</CategoryTitle>
      <PlayDetail namespace={namespace} />
    </main>
  );
}
