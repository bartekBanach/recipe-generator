import styles from './Spinner.module.css';

type SpinnerProps = {
  text?: string;
  position?: string;
  size?: string;
};

const Spinner = ({ text = '', size = '', position = '' }: SpinnerProps) => {
  return (
    <div
      className={`${styles.container} ${
        styles[position as keyof typeof styles]
      }`}
    >
      <div
        className={`${styles.spinner} ${styles[size as keyof typeof styles]}`}
      />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Spinner;
