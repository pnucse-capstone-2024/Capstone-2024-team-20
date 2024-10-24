import { Tab } from '../../utils/type';
import styles from '../styles/TicketingTab.module.css';

interface TicketingTabProps {
  tab: Tab;
  setTab : React.Dispatch<React.SetStateAction<Tab>>;
}

export default function TicketingTab({ tab, setTab }: TicketingTabProps) {
  const handleInfoTab = () => {
    setTab('info');
  };

  const handleTicketTab = () => {
    if (localStorage.getItem('userType') === 'PROVIDER') {
      alert('예매자 전용 기능입니다.');
    } else if (localStorage.getItem('userType') === 'CLIENT') {
      setTab('ticket');
    } else {
      alert('로그인이 필요합니다.');
      window.location.href = process.env.NODE_ENV === 'production'
        ? 'http://cse.ticketclove.com/page/main/login'
        : 'http://localhost:3000/page/main/login';
    }
  };

  const handleMerchandiseTab = () => {
    if (localStorage.getItem('userType') === 'PROVIDER') {
      alert('예매자 전용 기능입니다.');
    } else if (localStorage.getItem('userType') === 'CLIENT') {
      setTab('merchandise');
    } else {
      alert('로그인이 필요합니다.');
      window.location.href = process.env.NODE_ENV === 'production'
        ? 'http://cse.ticketclove.com/page/main/login'
        : 'http://localhost:3000/page/main/login';
    }
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.tab} ${tab === 'info' && styles.tabSelected}`}
        onClick={handleInfoTab}
      >
        공연 설명
      </button>
      <button
        type="button"
        className={`${styles.tab} ${tab === 'ticket' && styles.tabSelected}`}
        onClick={handleTicketTab}
      >
        티켓 예매
      </button>
      <button
        type="button"
        className={`${styles.tab} ${tab === 'merchandise' && styles.tabSelected}`}
        onClick={handleMerchandiseTab}
      >
        상품 구매
      </button>
    </div>
  );
}
