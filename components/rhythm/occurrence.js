import styles from '../../styles/Occurrence.module.css';

export default function Occurrence({ status, onClick }) {
  if (status?.includes('opportunity')) {
    return (
      <button
        onClick={onClick}
        className={`${styles.occurrence} ${styles[status]}`}
      ></button>
    );
  } else {
    return <div className={ `${styles.occurrence} ${styles[status]}` }></div>;
  }
};
