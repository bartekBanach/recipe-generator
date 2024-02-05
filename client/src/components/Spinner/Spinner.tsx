import styles from './Spinner.module.css';

type SpinnerProps = {
  text?: string;
  display?: string;
  size?: string;
};

const Spinner = ({ text = '', size = '', display = '' }: SpinnerProps) => {
  return (
    <div
      className={`${styles.container} ${
        styles[display as keyof typeof styles]
      }`}
    >
      <div
        className={`${styles.spinner} ${styles[size as keyof typeof styles]}`}
      />
      <h3>{text}</h3>
    </div>
  );
};

export default Spinner;
