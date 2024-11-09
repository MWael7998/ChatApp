import styles from "../CSS/Button.module.css";
export default function Button(props) {
  return (
    <button
      className={styles.button}
      onClick={() => {
        props.functionality();
      }}
    >
      {props.displayText}
    </button>
  );
}
