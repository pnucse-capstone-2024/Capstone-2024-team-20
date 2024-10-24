import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Play } from '../utils/type';
import styles from './styles/PlayCard.module.css';

export default function PlayCard({
  id,
  namespace,
  image,
  name,
  venue,
  startDate,
  endDate,
}: Play) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Link
      className={styles.link}
      to={process.env.NODE_ENV === 'production'
        ? `http://cse.ticketclove.com/${namespace}/page/play`
        : `http://localhost:3004/${namespace}/page/play`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={image}
            alt={`${name} 포스터`}
            className={`${styles.image} ${isHover && styles.imageHovered}`}
          />
        </div>
        <div className={styles.contentContainer}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.venue}>{venue}</div>
          <div className={styles.date}>
            {startDate}
            {' '}
            ~
            {' '}
            {endDate}
          </div>
        </div>
      </div>
    </Link>
  );
}
