import {
  Component, lazy, Suspense,
} from 'react';
import Loading from '../components/common/Loading';

interface State {
  hasError: boolean;
}

const DeployConcertPage = lazy(() => import('deploy/DeployConcertPage'));

class DeployConcertPageWrapper extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div>
          오류가 발생했습니다. 잠시 후 시도해주세요.
        </div>
      );
    }

    return (
      <Suspense fallback={<Loading />}>
        <DeployConcertPage />
      </Suspense>
    );
  }
}

export default DeployConcertPageWrapper;
