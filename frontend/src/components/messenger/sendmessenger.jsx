import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

let loged = Cookies.get("email");
const host = "http://localhost:1505";

export default function SendMessenger({ close }) {
  const [user, setUser] = useState(null);
  const [clickBtn, setClickBtn] = useState(false);

  const [message, setMessage] = useState({
    message: "",
    user_id: "",
    to_id: "",
    from_id: "",
  });
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(host);
    setSocket(newSocket);
    newSocket.on("id", (id) => {
      setUser(id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSendMessage() {
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
  }

  return (
    <div className="d-flex justify-content-around align-items-center p-2">
      <input
        type="text"
        style={{
          height: "35px",
          width: "180px",
          fontSize: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
        }}
        value={message.message}
        onChange={(e) => {
          setMessage({
            user_id: loged ? loged : user,
            message: e.target.value,
            from_id: loged ? loged : user,
            to_id: "admin",
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
          if (e.key === "Escape") {
            close();
          }
        }}
      />
      <button
        className="btn btn-outline-dark ml-2"
        style={{
          height: "30px",
          width: "40px",
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
  );
}
