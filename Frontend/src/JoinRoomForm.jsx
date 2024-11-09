import { useEffect, useState, useRef, useMemo } from "react";
import styles from "./CSS/Form.module.css";
import { useNavigate } from "react-router-dom";
export default function JoinRoomForm(props) {
  let link = useNavigate();
  const [room, setRoom] = useState({
    roomId: "",
    roomKey: "",
    isPrivate: false,
    username: "",
    userDoesExist: undefined,
    doesExist: undefined,
  });
  let timer;
  useEffect(() => {
    timer = setTimeout(() => {
      fetch("http://localhost:8080/exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: room.roomId,
          username: room.username,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setRoom({
            ...room,
            ...res,
          });
        });
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [room.roomId, room.username]);

  function submitForm() {
    if (room.doesExist && !room.userDoesExist) {
      fetch("http://localhost:8080/join-room", {
        method: "POST",
        body: JSON.stringify(room),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          return result.json();
        })
        .then((result) => {
          props.setUser(room.username);
          props.setCurrentRoomId(result.roomId);
          link("/room/" + result.roomId);
        });
    }
  }
  return (
    <>
      <div className={styles.input_container}>
        <label className={styles.input_title}>Room ID</label>
        <input
          type="text"
          className={
            styles.input_value +
            " " +
            (room.doesExist == undefined
              ? ""
              : room.doesExist == true
              ? styles.input_success
              : styles.input_error)
          }
          value={room.roomId}
          onChange={(e) => {
            setRoom({
              ...room,
              roomId: e.target.value,
            });
          }}
        />
      </div>
      <div className={styles.input_container}>
        <label className={styles.input_title}>Username</label>
        <input
          type="text"
          className={
            styles.input_value +
            " " +
            (room.userDoesExist == undefined
              ? ""
              : room.userDoesExist == true
              ? styles.input_error
              : styles.input_success)
          }
          value={room.username}
          onChange={(e) => {
            setRoom({
              ...room,
              username: e.target.value,
            });
          }}
        />
      </div>
      {room.isPrivate ? (
        <div className={styles.input_container}>
          <label className={styles.input_title}>Room key</label>
          <input
            type="text"
            className={styles.input_value}
            value={room.roomKey}
            onChange={(e) => {
              setRoom({
                ...room,
                roomKey: e.target.value,
              });
            }}
          />
        </div>
      ) : (
        ""
      )}

      <div className={styles.input_container}>
        <button
          className={
            styles.input_action +
            " " +
            styles.input_title +
            " " +
            styles.join_btn
          }
          onClick={submitForm}
        >
          Join Room
        </button>
      </div>
    </>
  );
}
