import { useState } from 'react';
import Label from '../common/Label';
import styles from '../styles/AddEventDate.module.css';

interface AddEventDateProps {
  eventDate: string[];
  setEventDate: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AddEventDate({ eventDate, setEventDate }: AddEventDateProps) {
  const [addEventDate, setAddEventDate] = useState('');

  const handleAddEventDate = () => {
    if (addEventDate !== '' && eventDate.find((e) => e === addEventDate) === undefined) {
      const dateString = addEventDate.replace('T', ' ');
      setEventDate((prev) => [...prev, dateString].sort((a, b) => new Date(a.replace(' ', 'T')).getTime() - new Date(b.replace(' ', 'T')).getTime()));
      setAddEventDate('');
    }
  };

  const handleRemoveEventDate = (index: number) => {
    setEventDate((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return (
    <div className={styles.container}>
      <Label name="공연 회차 정보">
        <input
          type="datetime-local"
          value={addEventDate}
          onChange={(e) => setAddEventDate(e.target.value)}
          className={styles.input}
        />
        <button
          type="button"
          onClick={handleAddEventDate}
        >
          추가
        </button>
      </Label>
      <ul className={styles.eventDateList}>
        {eventDate.map((event, index) => (
          <li
            key={event}
            className={styles.eventDate}
          >
            <div>
              {index + 1}
              {' '}
              회차
            </div>
            <div>{event}</div>
            <button
              type="button"
              onClick={() => handleRemoveEventDate(index)}
              className={styles.deleteButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
