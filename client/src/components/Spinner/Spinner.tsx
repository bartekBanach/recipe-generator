import styles from './Spinner.module.css';

type SpinnerProps = {
  text?: string;
  display?: string;
  size?: string;
};

const Spinner = ({ text = '', size = '', display = '' }: SpinnerProps) => {
  return (
    <div className={`${styles.container} ${styles[display]}`}>
      <div className={`${styles.spinner} ${styles[size]}`} />
      <h3>{text}</h3>
    </div>
  );
};

export default Spinner;
