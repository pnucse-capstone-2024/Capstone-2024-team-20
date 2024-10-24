import { Component, lazy, Suspense } from 'react';
import Loading from '../components/common/Loading';

interface State {
  hasError: boolean;
}

const UserStatusBar = lazy(() => import('auth/UserStatusBar'));

class UserStatusBarWrapper extends Component<any, State> {
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          로그인 서버 오류
        </div>
      );
    }

    return (
      <Suspense fallback={<Loading />}>
        <UserStatusBar />
      </Suspense>
    );
  }
}

export default UserStatusBarWrapper;
