import styles from '../styles/JsonViewer.module.css';

interface JsonViewerProps {
  data: any;
  depth: number;
}

export default function JsonViewer({ data, depth }: JsonViewerProps) {
  if (data === null) {
    return (
      <>
      </>
    );
  }

  if (typeof data === 'object' && !Array.isArray(data)) {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li
            key={key}
            className={styles.tab}
          >
            <span className={styles.text}>
              {key}
              :
              {' '}
            </span>
            <JsonViewer
              data={value}
              depth={depth + 1}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (Array.isArray(data)) {
    return (
      <ul>
        {data.map((item, index) => (
          <li
            key={index}
            className={styles.tab}
          >
            <JsonViewer
              data={item}
              depth={depth + 1}
            />
          </li>
        ))}
      </ul>
    );
  }

  return <span className={styles.text}>{data}</span>;
}
