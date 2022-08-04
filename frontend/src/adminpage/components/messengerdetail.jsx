import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import MessengerItem from "../../components/messenger/messengeritem";
const host = "http://localhost:1505";

export default function MessengerDetail({ user_id }) {
  const [socket, setSocket] = useState(null);
  const [messageLs, setMessageLs] = useState([]);
  const [clickBtn, setClickBtn] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    user_id: "",
    to_id: "",
    from_id: "",
  });
  const bottomRef = useRef();

  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ top: 10, behavior: "smooth" });
  }

  useEffect(() => {
    const newSocket = io(host);
    setSocket(newSocket);
  }, []);
  useEffect(() => {
    if (socket) {
      socket.emit("user", user_id);
      socket.on("messenger", (ms) => {
        setMessageLs(ms);
      });
    }
  }, [socket, clickBtn, user_id]);

  const handleSendMessage = () => {
    if (message.message !== "") {
      socket.emit("newMessage", message);
      socket.emit("getNewMess");
      setMessage({
        message: "",
        user_id: "",
        to_id: "",
        from_id: "",
      });
      setClickBtn(!clickBtn);
    }
  };

  return (
    <div
      className="bg-white"
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        className="p-4"
        style={{
          width: "100%",
          height: "520px",
          overflow: "auto",
        }}
      >
        {messageLs.length > 0 &&
          messageLs.map((item, index) => (
            <MessengerItem
              key={index}
              user={item.from_id === "admin" ? item.from_id : null}
              message={item.message}
              time={item.date_created}
            />
          ))}
        <div ref={bottomRef}></div>
      </div>
      <div className="px-1">
        <div className="d-flex justify-content-around align-items-center p-2">
          <input
            type="text"
            style={{
              height: "40px",
              width: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
            }}
            value={message.message}
            onChange={(e) => {
              setMessage({
                message: e.target.value,
                user_id: user_id,
                to_id: user_id,
                from_id: "admin",
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            className="btn btn-outline-dark ml-2"
            style={{
              height: "40px",
              width: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              outline: "none",
            }}
            type="button"
            onClick={handleSendMessage}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
