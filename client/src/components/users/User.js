import React, { useContext, useState } from "react";
import profile_pic from "../layout/img/profilepic.png";
import moment from "moment";
import UsersContext from "../../context/users/usersContext";
import NavContext from "../../context/nav/navContext";

const User = ({ user }) => {
  const navContext = useContext(NavContext);
  const { setActive } = navContext;

  const usersContext = useContext(UsersContext);
  const { followUser, setConfirm, viewProfile, MessageUser } = usersContext;

  const { username, id, joined, following, followed, avatar } = user;
  const [profile] = useState({ username, avatar, id });

  const message = () => {
    setActive("chat");
    MessageUser(profile);
  };

  return (
    <div className="card">
      {followed && <div className="followed">Follows you</div>}
      <div className="img" id="img">
        {avatar ? (
          <img
            onClick={() => viewProfile(profile)}
            src={`/api/auth/avatar/${id}`}
            alt=""
          />
        ) : (
          <img onClick={() => viewProfile(profile)} src={profile_pic} alt="" />
        )}
      </div>
      <div className="other">
        <h3 onClick={() => viewProfile(profile)}>@{username}</h3>
        <p onClick={() => viewProfile(profile)}>
          Joined at: {moment(joined).format("LL")}
        </p>
        {!following && (
          <button onClick={() => followUser(id)} className="btn-primary">
            Follow
          </button>
        )}
        {following && (
          <button
            onClick={() => setConfirm(username, id)}
            className="btn-secondary"
          >
            Unfollow
          </button>
        )}
        <button
          className="btn-info"
          style={{ marginLeft: "4px" }}
          onClick={message}
        >
          <i className="fas fa-envelope"></i> Message
        </button>
      </div>
    </div>
  );
};

export default User;
