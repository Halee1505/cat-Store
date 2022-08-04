import React from "react";
import SendMessenger from "./sendmessenger";
import ReceiveMessenger from "./receivemessenger";
import { useState } from "react";
import "../../css/style.css";
import "../../css/responsivestyle.css";

export default function Chat() {
  const [open, setOpen] = useState(false);
  return (
    <div className="chat">
      <img
        className="chat-icon"
        src="http://gerick.weebly.com/uploads/4/8/9/3/4893452/9972531.png?251"
        alt="chat"
        onClick={() => setOpen(!open)}
      />
      <div className={open ? "chat-box-open" : "chat-box"}>
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p
            className="close"
            style={{
              alignSelf: "flex-end",
              marginTop: "-5px",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            &times;
          </p>
          <ReceiveMessenger />
          <SendMessenger close={setOpen} />
        </div>
      </div>
    </div>
  );
}
