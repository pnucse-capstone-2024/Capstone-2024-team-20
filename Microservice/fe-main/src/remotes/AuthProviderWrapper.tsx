import {
  Component, lazy, ReactNode, Suspense,
} from 'react';
import Loading from '../components/common/Loading';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const AuthProvider = lazy(() => import('auth/AuthProvider'));

class AuthProviderWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return children;
    }

    return (
      <Suspense fallback={<Loading />}>
        <AuthProvider>{children}</AuthProvider>
      </Suspense>
    );
  }
}

export default AuthProviderWrapper;
