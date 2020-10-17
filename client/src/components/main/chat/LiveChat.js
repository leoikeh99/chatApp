import React, { Fragment, useState, useEffect, useContext } from "react";
import profile_pic from "../../layout/img/profilepic.png";
import usersContext from "../../../context/users/usersContext";
import { getDays, checkDate } from "../../../functions/helperFunctions";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import $ from "jquery";
import Spinner from "../../layout/Spinner";

const LiveChat = ({ user, socket, sender, senderName, senderAv }) => {
  const UsersContext = useContext(usersContext);
  const {
    chat,
    getChat,
    clearMessageUser,
    loader2,
    clearUnread,
  } = UsersContext;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState("");
  const { avatar, id, username } = user;

  const submit = (e) => {
    e.preventDefault();
    const body = $(".liveChat .body");
    if (message.trim() !== "") {
      socket.emit("sendMessage", {
        msg: message,
        reciever: id,
        token: localStorage.getItem("token"),
        senderName,
        recieverName: username,
        senderAv: senderAv ? true : false,
        recieverAv: avatar,
      });

      setMessages([
        ...messages,
        { msg: message, sender, reciever: id, _id: uuidv4() },
      ]);
      setTimeout(() => {
        body.scrollTop(body[0].scrollHeight);
      }, 0.3);
    }
    setMessage("");
  };

  useEffect(() => {
    if (message !== "") {
      socket.emit("typing", {
        token: localStorage.getItem("token"),
        reciever: id,
      });
    } else {
      socket.emit("notTyping", {
        token: localStorage.getItem("token"),
        reciever: id,
      });
    }
    // eslint-disable-next-line
  }, [message]);

  useEffect(() => {
    getChat(id);
    clearUnread(id);
    socket.on("recieveMessage", (data) => {
      clearUnread(id);
    });
    socket.on("typing", (data) => {
      if (data.sender === id) {
        setTyping("typing...");
      }
    });
    socket.on("notTyping", (data) => {
      if (data.sender === id) {
        setTyping("");
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const body = $(".liveChat .body");
    if (chat) {
      setMessages(chat);
      setTimeout(() => {
        body.scrollTop(body[0].scrollHeight);
      }, 0.3);
    }
    // eslint-disable-next-line
  }, [chat]);

  useEffect(() => {
    $(".day").css("display", "none");
    const body = $(".liveChat .body");
    socket.on("recieveMessage", (data) => {
      setMessages([
        ...messages,
        {
          msg: data.msg,
          sender: data.sender,
          reciever: data.reciever,
          _id: data.id,
        },
      ]);
      body.scrollTop(body[0].scrollHeight);
    });
    if (messages.length !== 0 && !loader2) {
      const body = $(".liveChat .body")[0];
      getDays(messages).forEach((day) => {
        const days = $("<div>");
        days.append($(`<div>${checkDate(day.date)}</div>`).addClass("day"));
        body.insertBefore(days[0], document.getElementById(day.id));
        $(days[0]).insertBefore($(`#${day.id}`)[0]);
      });
    }
    // eslint-disable-next-line
  }, [messages]);

  return (
    <Fragment>
      <div className="liveChat">
        <div className="header">
          <i onClick={clearMessageUser} className="fas fa-arrow-left"></i>
          {avatar ? (
            <img src={`/api/auth/avatar/${id}`} alt="" />
          ) : (
            <img src={profile_pic} alt="" />
          )}
          <div className="other">
            <h3>
              {" "}
              @{username} <br /> <em> {typing} </em>{" "}
            </h3>
          </div>
        </div>
        <div className="body">
          {loader2 ? (
            <Spinner />
          ) : (
            messages.map((message) => (
              <div className="chat" key={message._id} id={message._id}>
                {message.sender === id && message.reciever === sender ? (
                  <div className="chat-left">
                    <p>{message.msg}</p>
                    <i className="fas fa-caret-left"></i>
                    <span className="time">
                      {moment(message.createdAt).format("LT")}
                    </span>
                  </div>
                ) : message.sender === sender && message.reciever === id ? (
                  <div className="chat-right">
                    <p>{message.msg}</p>
                    <i className="fas fa-caret-right"></i>
                    <span className="time">
                      <span>{moment(message.createdAt).format("LT")}</span>
                    </span>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
        <form action="" onSubmit={submit}>
          <div className="cover">
            <input
              type="text"
              placeholder="Enter message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <div className="sendBtn" onClick={submit}>
              <i className="fas fa-paper-plane"></i>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LiveChat;
