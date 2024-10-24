import {
  Component, lazy, Suspense,
} from 'react';
import Loading from '../components/common/Loading';

interface Props {
  namespace: string;
  eventName: string;
}

interface State {
  hasError: boolean;
}

const SimplePlayMonitor = lazy(() => import('monitor/SimplePlayMonitor'));

class SimplePlayMonitorWrapper extends Component<Props, State> {
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
      return null;
    }

    const {
      namespace, eventName,
    } = this.props;

    return (
      <Suspense fallback={<Loading />}>
        <SimplePlayMonitor
          namespace={namespace}
          eventName={eventName}
        />
      </Suspense>
    );
  }
}

export default SimplePlayMonitorWrapper;
