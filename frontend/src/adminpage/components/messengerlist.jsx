import { useState, useEffect } from "react";
import MessengerDetail from "./messengerdetail";
import axios from "axios";
import io from "socket.io-client";
const host = "http://localhost:1505";
const uniqueUserMessage = (ms) => {
  let newUserMessage = [];

  const userMessage = ms.sort((a, b) => {
    return b.id - a.id;
  });

  userMessage.forEach((item, index) => {
    if (newUserMessage.length === 0) {
      newUserMessage.push(item);
    } else {
      let check = false;
      newUserMessage.forEach((item2, index2) => {
        if (item.user_id === item2.user_id) {
          check = true;
        }
      });
      if (!check) {
        newUserMessage.push(item);
      }
    }
  });
  return newUserMessage;
};

export default function MessengerList() {
  const [userMessage, setUserMessage] = useState([]);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userMessageDetail, setUserMessageDetail] = useState(null);
  // const [audio, setAudio] = useState("");

  useEffect(() => {
    axios.get(`${host}/user`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    const newSocket = io(host);
    setSocket(newSocket);
  }, []);
  if (socket) {
    socket.on("userMessenger", (ms) => {
      // if (audio === "") {
      //   setAudio(
      //     new Audio(
      //       "https://res.cloudinary.com/vitamim/video/upload/v1658827375/cat%20store/Messenger_kby6a5.mp3"
      //     )
      //   );
      // } else {
      //   audio.play();
      // }
      setUserMessage(uniqueUserMessage(ms));
    });
  }
  console.log(socket);
  function handleDeleteMessage(id) {
    const cf = window.confirm("Xác nhận xóa tin nhắn?");
    if (cf) {
      socket.emit("deleteMessage", id);
    }
  }
  return (
    <div className="container-fluid bg-white">
      <div className="row">
        <div className="col-sm-4">
          <div className="row">
            {userMessage.length > 0 &&
              userMessage.map((item, index) => (
                <div
                  className={`col-sm-12 p-0 border rounded mb-1 ${
                    String(item.user_id) === String(userMessageDetail)
                      ? "bg-secondary text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setUserMessageDetail(item.user_id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="row">
                    <div className="col-sm-2 p-0 d-flex align-items-center justify-content-center">
                      <img
                        src={
                          users.find(
                            (user) => String(user.id) === String(item.user_id)
                          ) &&
                          users.find(
                            (user) => String(user.id) === String(item.user_id)
                          ).avatar
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        alt="avatar"
                      />
                    </div>
                    <div className="col-sm-9 p-0">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="row">
                            <div className="col-sm-12">
                              <h5
                                style={{
                                  fontSize: "15px",
                                }}
                              >
                                {(users.find(
                                  (user) =>
                                    String(user.id) === String(item.user_id)
                                ) &&
                                  users.find(
                                    (user) =>
                                      String(user.id) === String(item.user_id)
                                  ).name !== null &&
                                  users.find(
                                    (user) =>
                                      String(user.id) === String(item.user_id)
                                  ).name) ||
                                  "Khách hàng"}
                              </h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <p>{item.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-1 p-0 d-flex justify-content-center align-items-center">
                      <i
                        class="fas fa-times"
                        onClick={() => {
                          handleDeleteMessage(item.user_id);
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-sm-8 border-left">
          <div
            className="p-4"
            style={{
              width: "100%",
              height: "630px",
              background: "#f5f5f5",
              overflow: "auto",
            }}
          >
            {userMessageDetail && (
              <MessengerDetail user_id={userMessageDetail} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
