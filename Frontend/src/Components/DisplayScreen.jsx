import styles from "../CSS/Displayscreen.module.css";
export default function DisplayScreen(props) {
  return (
    <div className={styles.displayscreen}>
      {props.msgs.map((ele, index) => {
        return (
          <p key={index}>
            {ele.msgSender}: {ele.msgText}
          </p>
        );
      })}
    </div>
  );
}
