import "./CSS/room.css";
import List from "./Components/List";
import Button from "./Components/Button";
import Input from "./Components/Input";
import DisplayScreen from "./Components/DisplayScreen";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
let socket;

export default function Room(props) {
  const [room, setRoom] = useState({
    roomId: "",
    roomKey: "",
    isPrivate: "",
    arrayOfUsers: [],
  });
  const [msgArray, setMsgArray] = useState([]);
  const [textValue, setTextValue] = useState("");
  let link = useNavigate();
  function exitChat() {
    fetch("http://localhost:8080/exit-room", {
      method: "POST",
      body: JSON.stringify({
        roomId: props.currentRoomId,
        user: props.user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result.success == true) {
          setRoom({
            roomId: "",
            roomKey: "",
            arrayOfUsers: [],
            isPrivate: false,
          });
          link("/");
        }
      });
  }
  useEffect(() => {
    socket = io("http://localhost:5000");
    fetch("http://localhost:8080/get-room", {
      method: "POST",
      body: JSON.stringify({
        roomId: props.currentRoomId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        socket.connect();
        return result.json();
      })
      .then((result) => {
        setRoom(result);
        socket.emit("join-room", props.currentRoomId);
        socket.on("get-message", (value) => {
          setMsgArray((msgArrayParam) => {
            return [
              ...msgArrayParam,
              {
                msgSender: value.msgSender,
                msgText: value.msgText,
              },
            ];
          });
        });
      });
    return () => {
      socket.close();
      exitChat();
    };
  }, []);
  function sendText() {
    setTextValue("");
    socket.emit("message", {
      value: {
        msgSender: props.user,
        msgText: textValue,
      },
      room: props.currentRoomId,
    });
  }
  return (
    <div className="room_container">
      <div className="users_container">
        <List users={room.arrayOfUsers} />
      </div>
      <div className="message_container">
        <DisplayScreen msgs={msgArray} />
      </div>
      <div className="exit_container">
        <Button displayText="Exit Chat" functionality={exitChat} />
      </div>
      <div className="input_container">
        <Input value={textValue} setvalue={setTextValue} />
        <Button displayText="Send" functionality={sendText} />
      </div>
    </div>
  );
}
