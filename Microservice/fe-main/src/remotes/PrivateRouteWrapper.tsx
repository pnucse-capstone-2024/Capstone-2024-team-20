import {
  Component, lazy, Suspense,
} from 'react';
import Loading from '../components/common/Loading';

interface State {
  hasError: boolean;
}

const PrivateRoute = lazy(() => import('auth/PrivateRoute'));

class PrivateRouteWrapper extends Component<any, State> {
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
      return <div>권한이 없습니다.</div>;
    }

    return (
      <Suspense fallback={<Loading />}>
        <PrivateRoute />
      </Suspense>
    );
  }
}

export default PrivateRouteWrapper;
