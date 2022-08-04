import MessengerItem from "./messengeritem";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";
let loged = Cookies.get("email");

const host = "http://localhost:1505";
export default function ReceiveMessenger() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState(null);
  const bottomRef = useRef();
  // const [audio, setAudio] = useState("");

  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ top: 1000, behavior: "smooth" });
  }

  useEffect(() => {
    const newSocket = io(host);
    setSocket(newSocket);
    if (loged) {
      newSocket.emit("user", loged);
      setUser(loged);
    } else {
      newSocket.on("id", (id) => {
        setUser(id);
      });
    }
  }, []);
  if (socket) {
    socket.on("messenger", (ms) => {
      // if (audio === "") {
      //   setAudio(
      //     new Audio(
      //       "https://res.cloudinary.com/vitamim/video/upload/v1658827375/cat%20store/Messenger_kby6a5.mp3"
      //     )
      //   );
      // } else {
      //   audio.play();
      // }
      setMessage(ms);
    });
  }

  return (
    <div
      className="mb-3 row"
      style={{
        width: "100%",
        height: "250px",
        overflow: "auto",
      }}
    >
      <div className="col-sm-12 px-1">
        {message.length > 0 &&
          message.map((item, index) => (
            <MessengerItem
              key={index}
              user={
                String(item.from_id) === String(loged ? loged : user)
                  ? item.from_id
                  : null
              }
              message={item.message}
              time={item.date_created}
            />
          ))}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}
