import {
  Component, lazy, Suspense,
} from 'react';
import Loading from '../components/common/Loading';

interface Props {
  namespace: string;
  seatData: any;
}

interface State {
  hasError: boolean;
}

const PlayMonitor = lazy(() => import('monitor/PlayMonitor'));

class PlayMonitorWrapper extends Component<Props, State> {
  constructor(props: Props) {
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

    const {
      namespace,
      seatData,
    } = this.props;

    return (
      <Suspense fallback={<Loading />}>
        <PlayMonitor
          namespace={namespace}
          seatData={seatData}
        />
      </Suspense>
    );
  }
}

export default PlayMonitorWrapper;
