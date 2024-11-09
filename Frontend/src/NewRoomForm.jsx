import { useState, useEffect } from "react";
import styles from "./CSS/Form.module.css";
import { Navigate, useNavigate } from "react-router-dom";
export default function NewRoomForm(props) {
  const [room, setRoom] = useState({
    roomId: "",
    roomKey: "",
    isPrivate: false,
    maxNumber: 100,
    username: "",
  });
  const [roomExists, setRoomExists] = useState(true);
  let link = useNavigate();
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
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setRoomExists(res.roomExists);
        });
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [room.roomId]);
  function submitForm() {
    if (!roomExists) {
      fetch("http://localhost:8080/create-room", {
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
          if (result.success == true) {
            props.setUser(room.username);
            link("/room/" + result.roomId);
            props.setCurrentRoomId(result.roomId);
          }
        });
    }
  }
  return (
    <>
      <div className={styles.input_container}>
        <label className={styles.input_title}>Room ID</label>
        <input
          type="text"
          className={styles.input_value}
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
          className={styles.input_value}
          value={room.username}
          onChange={(e) => {
            setRoom({
              ...room,
              username: e.target.value,
            });
          }}
          disabled={roomExists}
        />
      </div>
      <div className={styles.input_container}>
        <label className={styles.input_title}>Room Key</label>
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
          disabled={!room.isPrivate}
        />
      </div>
      <div className={styles.input_block}>
        <div className={styles.input_cube}>
          <input
            type="radio"
            name="privacySelection"
            id="selectPublic"
            className={styles.input_value}
            value={room.isPrivate}
            onChange={(e) => {
              setRoom({ ...room, isPrivate: false });
            }}
          />
          <label className={styles.input_title} htmlFor="selectPublic">
            Public
          </label>
        </div>
        <div className={styles.input_cube}>
          <input
            type="radio"
            name="privacySelection"
            id="selectPrivate"
            value={room.isPrivate}
            onChange={(e) => {
              setRoom({ ...room, isPrivate: true });
            }}
          />
          <label className={styles.input_title} htmlFor="selectPrivate">
            Private
          </label>
        </div>
      </div>

      <div className={styles.input_container}>
        <label className={styles.input_title}>
          Max Number of People: {room.maxNumber}
        </label>
        <input
          type="range"
          className={styles.input_value + " " + styles.zero_padding}
          min="0"
          max="100"
          value={room.maxNumber}
          onChange={(e) => {
            setRoom({
              ...room,
              maxNumber: e.target.value,
            });
          }}
        ></input>
      </div>
      <div className={styles.input_container}>
        <button
          className={
            styles.input_action +
            " " +
            styles.input_title +
            " " +
            styles.create_btn
          }
          onClick={(e) => {
            submitForm();
          }}
        >
          Create Room
        </button>
      </div>
    </>
  );
}
