import styles from "../CSS/center.module.css";
export default function Center(props) {
  return <div className={styles.container}>{props.children}</div>;
}
