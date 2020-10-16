import React, { useEffect, useContext } from "react";
import usersContext from "../../../context/users/usersContext";
import { arrange } from "../../../functions/helperFunctions";
import ChatItem from "../chat/ChatItem";

const ChatList = ({ user, socket }) => {
  const UsersContext = useContext(usersContext);
  const { chatList, getChatList, setChatList, getUnread } = UsersContext;
  const { _id } = user;

  useEffect(() => {
    getChatList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    user && getUnread();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    socket.on("recieveMessage", (data) => {
      if (chatList) {
        setChatList(arrange(chatList, data));
      }
    });
    // eslint-disable-next-line
  }, [chatList]);

  return (
    <section className="chatList">
      <h2>Recent Chats</h2>
      {chatList && chatList.length !== 0 ? (
        <div className="chats">
          {chatList.map((list) => (
            <ChatItem _id={_id} list={list} key={list._id} socket={socket} />
          ))}
        </div>
      ) : (
        <div>No recent chats</div>
      )}
    </section>
  );
};

export default ChatList;
