import styles from "../CSS/User.module.css";
export default function List(props) {
  return (
    <div className={styles.list_container}>
      <div className={styles.list_title}>Users</div>
      <div
        className={
          styles.list_content +
          " " +
          (props.users.length >= 12 ? styles.more_content : "")
        }
      >
        {props.users.map((element) => {
          return (
            <div className={styles.user} key={element}>
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
}
