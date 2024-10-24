import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProviderRoute() {
  const { auth, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!auth.isLogin) {
    window.location.href = process.env.NODE_ENV === 'production'
      ? 'http://cse.ticketclove.com/page/main/login'
      : 'http://localhost:3000/page/main/login';

    return null;
  }

  if (auth.userType !== 'PROVIDER') {
    document.title = 'Clove 티켓';

    return <div>권한이 없습니다.</div>;
  }

  return <Outlet />;
}
