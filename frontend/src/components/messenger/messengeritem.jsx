import React from "react";
import "../../css/style.css";
import { useState } from "react";

function compareDate(date) {
  const date_ = new Date(date);
  const curDate_ = new Date();
  if (
    new Date(
      date_.getFullYear() + "-" + (date_.getMonth() + 1) + "-" + date_.getDate()
    ) <
    new Date(
      curDate_.getFullYear() +
        "-" +
        (curDate_.getMonth() + 1) +
        "-" +
        curDate_.getDate()
    )
  ) {
    return (
      date_.getDate() + "-" + (date_.getMonth() + 1) + "-" + date_.getFullYear()
    );
  } else {
    return date_.getHours() + ":" + date_.getMinutes();
  }
}

export default function MessengerItem({ user, message, time }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div
      className="d-flex"
      style={{
        flexDirection: !user ? "row" : "row-reverse",
      }}
    >
      <div
        className={
          !user ? "message right p-1 show-time" : "message left p-1 show-time"
        }
        onMouseEnter={() => {
          setIsShow(true);
        }}
        onMouseLeave={() => {
          setIsShow(false);
        }}
      >
        <div
          className="text_wrapper"
          style={{
            cursor: "pointer",
          }}
        >
          <div
            className="box"
            style={{
              background: !user ? "#c8c8c8" : "#ededed",
              color: !user ? "#ffffff" : "#4e4e4e",
              borderRadius: "5px",
              width: "max-content",
              maxWidth: "180px",
              fontSize: "14px",
              padding: "5px 10px",
            }}
          >
            {message}
          </div>
        </div>
      </div>
      <div
        className="time text-white-50 align-self-end"
        style={{
          fontSize: "9px",
          marginBottom: "5px",
          visibility: isShow ? "visible" : "hidden",
        }}
      >
        {compareDate(time)}
      </div>
    </div>
  );
}
