import useAuth from '../../hooks/useAuth';
import Divider from '../common/Divider';
import styles from '../styles/UserStatusBar.module.css';
import { logout } from '../../apis/auth';
import { removeUserSessionData } from '../../utils/auth';

const serverURL = 'http://cse.ticketclove.com';

export default function UserStatusBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    removeUserSessionData();
    logout();
    setAuth({
      isLogin: false,
      email: null,
      userType: null,
      accessToken: null,
    });
  };

  if (!auth?.isLogin) {
    return (
      <div className={styles.container}>
        <a
          href={process.env.NODE_ENV === 'production'
            ? `${serverURL}/page/main/login`
            : 'http://localhost:3000/page/main/login'}
          className={styles.link}
        >
          로그인
        </a>
        <Divider />
        <a
          href={process.env.NODE_ENV === 'production'
            ? `${serverURL}/page/main/signup`
            : 'http://localhost:3000/page/main/signup'}
          className={styles.link}
        >
          회원가입
        </a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.email}>{auth.email}</div>
      <Divider />
      {auth.userType === 'CLIENT' && (
      <a
        href={process.env.NODE_ENV === 'production'
          ? `${serverURL}/page/main/myTicket`
          : 'http://localhost:3000/page/main/myTicket'}
        className={styles.link}
      >
        티켓 관리
      </a>
      )}
      {auth.userType === 'PROVIDER' && (
      <a
        href={process.env.NODE_ENV === 'production'
          ? `${serverURL}/page/main/owner`
          : 'http://localhost:3000/page/main/owner'}
        className={styles.link}
      >
        공연 관리
      </a>
      )}
      <Divider />
      <button
        className={styles.logout}
        type="button"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
}
