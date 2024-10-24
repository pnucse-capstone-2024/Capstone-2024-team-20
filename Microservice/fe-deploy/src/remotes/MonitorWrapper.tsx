import {
  Component, lazy, Suspense,
} from 'react';
import Loading from '../components/common/Loading';

interface Props {
  namespace: string;
  enableSlices: boolean;
  autoRefresh: boolean;
  start: number;
  end: number;
  step: string;
}

interface State {
  hasError: boolean;
}

const Monitor = lazy(() => import('monitor/Monitor'));

class MonitorWrapper extends Component<Props, State> {
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
      enableSlices,
      autoRefresh,
      start,
      end,
      step,
    } = this.props;

    return (
      <Suspense fallback={<Loading />}>
        <Monitor
          namespace={namespace}
          enableSlices={enableSlices}
          autoRefresh={autoRefresh}
          start={start}
          end={end}
          step={step}
        />
      </Suspense>
    );
  }
}

export default MonitorWrapper;
