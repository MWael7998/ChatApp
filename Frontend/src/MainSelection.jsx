import styles from "./Css/MainSelection.module.css";
import NewRoomForm from "./NewRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import { useState } from "react";

export default function MainSelection(props) {
  const [mood, setMood] = useState("");
  return (
    <div
      className={
        styles.container +
        " " +
        (mood == "joinOldRoom" ? styles.join_shadow : styles.create_shadow)
      }
    >
      <div className={styles.container_actions}>
        <button
          className={styles.container_button + " " + styles.btn_create}
          onClick={() => {
            setMood("createNewRoom");
          }}
        >
          Create a new room
        </button>
        <button
          className={styles.container_button + " " + styles.btn_join}
          onClick={() => {
            setMood("joinOldRoom");
          }}
        >
          Join an existing room
        </button>
      </div>
      <div className={styles.container_inputs}>
        {mood == "joinOldRoom" ? (
          <JoinRoomForm
            setCurrentRoomId={props.setCurrentRoomId}
            setUser={props.setUser}
          />
        ) : (
          <NewRoomForm
            setCurrentRoomId={props.setCurrentRoomId}
            setUser={props.setUser}
          />
        )}
      </div>
    </div>
  );
}
