import styles from "../CSS/Input.module.css";
export default function Input(props) {
  return (
    <textarea
      className={styles.textarea}
      value={props.value}
      onChange={(e) => {
        props.setvalue(e.target.value);
      }}
    ></textarea>
  );
}
