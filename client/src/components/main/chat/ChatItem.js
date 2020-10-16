import React, { Fragment, useContext, useEffect, useState } from "react";
import profile_pic from "../../layout/img/profilepic.png";
import usersContext from "../../../context/users/usersContext";
import moment from "moment";

const ChatItem = ({ list, _id, socket }) => {
  const UsersContext = useContext(usersContext);
  const { MessageUser, unread } = UsersContext;

  const [typing, setTyping] = useState("");
  const [unreadValue, setUnreadValue] = useState(null);

  const message = (profile) => {
    MessageUser(profile);
  };

  useEffect(() => {
    socket.on("typing", (data) => {
      if (list.sender === _id) {
        if (data.sender === list.reciever) {
          setTyping("typing...");
        }
      } else if (list.reciever === _id) {
        if (data.sender === list.sender) {
          setTyping("typing...");
        }
      }
    });
    socket.on("notTyping", (data) => {
      if (list.sender === _id) {
        if (data.sender === list.reciever) {
          setTyping("");
        }
      } else if (list.reciever === _id) {
        if (data.sender === list.sender) {
          setTyping("");
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("recieveMessage", (data) => {
      if (list.sender === _id) {
        if (data.sender === list.reciever) {
          setUnreadValue(unreadValue + 1);
        }
      } else if (list.reciever === _id) {
        if (data.sender === list.sender) {
          setUnreadValue(unreadValue + 1);
        }
      }
    });
    // eslint-disable-next-line
  }, [unreadValue]);

  useEffect(() => {
    if (unread) {
      if (list.sender === _id) {
        let amount = 0;
        unread.forEach((val) => {
          if (val.sender === list.reciever) {
            amount += val.amount;
          }
        });
        setUnreadValue(amount);
      } else if (list.reciever === _id) {
        let amount = 0;
        unread.forEach((val) => {
          if (val.sender === list.sender) {
            amount += val.amount;
          }
        });
        setUnreadValue(amount);
      }
    }
    // eslint-disable-next-line
  }, [unread]);

  return (
    <Fragment>
      {list.sender === _id ? (
        <div
          onClick={() =>
            message({
              avatar: list.recieverAv,
              username: list.recieverName,
              id: list.reciever,
            })
          }
          className="chat"
        >
          <div className="first">
            {list.recieverAv ? (
              <img src={`/api/auth/avatar/${list.reciever}`} alt="" />
            ) : (
              <img src={profile_pic} alt="" />
            )}
            <div className="other">
              <h3>@{list.recieverName}</h3>
              <p>{list.msg}</p>
              <em>{typing}</em>
            </div>
          </div>

          <div className="second">
            {unreadValue && unreadValue !== 0 ? (
              <span className="unread">{unreadValue}</span>
            ) : null}
            <br /> {moment(list.createdAt).format("LT")}
          </div>
        </div>
      ) : (
        <div
          onClick={() =>
            message({
              avatar: list.senderAv,
              username: list.senderName,
              id: list.sender,
            })
          }
          className="chat"
        >
          <div className="first">
            {list.senderAv ? (
              <img src={`/api/auth/avatar/${list.sender}`} alt="" />
            ) : (
              <img src={profile_pic} alt="" />
            )}
            <div className="other">
              <h3>@{list.senderName}</h3>
              <p>{list.msg}</p>
              <em>{typing}</em>
            </div>
          </div>

          <div className="second">
            {unreadValue && unreadValue !== 0 ? (
              <span className="unread">{unreadValue}</span>
            ) : null}
            <br /> {moment(list.createdAt).format("LT")}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ChatItem;
