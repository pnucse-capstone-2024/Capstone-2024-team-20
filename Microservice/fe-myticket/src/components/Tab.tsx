import { TabType } from '../utils/type';
import styles from './styles/Tab.module.css';

interface TabProps {
  tab: TabType;
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
}

export default function Tab({
  tab,
  setTab,
}: TabProps) {
  const handleTab = (tabType: TabType) => {
    setTab(tabType);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => handleTab('ticket')}
        className={`${styles.tab} ${tab === 'ticket' && styles.tabSelected}`}
      >
        티켓
      </button>
      <button
        type="button"
        onClick={() => handleTab('merchandise')}
        className={`${styles.tab} ${tab === 'merchandise' && styles.tabSelected}`}
      >
        상품
      </button>
    </div>
  );
}
