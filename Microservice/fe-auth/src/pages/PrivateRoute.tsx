import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute() {
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

  return <Outlet />;
}
