import React, { useContext } from "react";
import ChatList from "./chat/ChatList";
import LiveChat from "./chat/LiveChat";
import usersContext from "../../context/users/usersContext";

const Chat = ({ socket, user }) => {
  const UsersContext = useContext(usersContext);
  const { messageUser } = UsersContext;

  return (
    <section className="chat">
      {!messageUser ? (
        <ChatList user={user} socket={socket} />
      ) : (
        <LiveChat
          socket={socket}
          user={messageUser}
          senderName={user.username}
          sender={user._id}
          senderAv={user.avatar}
        />
      )}
    </section>
  );
};

export default Chat;
