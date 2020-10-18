import React, { useContext, useState } from "react";
import profile_pic from "../layout/img/profilepic.png";
import moment from "moment";
import UsersContext from "../../context/users/usersContext";
import NavContext from "../../context/nav/navContext";

const User = ({ user, _id }) => {
  const navContext = useContext(NavContext);
  const { setActive } = navContext;

  const usersContext = useContext(UsersContext);
  const { followUser, setConfirm, viewProfile, MessageUser } = usersContext;

  const { username, bio, id, joined, following, followed, avatar } = user;
  const [profile] = useState({ username, avatar, id, bio });

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
          <button
            onClick={() => followUser(id)}
            className={id !== _id ? "btn-primary" : "btn-primary-disabled"}
            disabled={id === _id ? true : false}
          >
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
          className={id !== _id ? "btn-info" : "btn-info-disabled"}
          style={{ marginLeft: "4px" }}
          onClick={message}
          disabled={id === _id ? true : false}
        >
          <i className="fas fa-envelope"></i> Message
        </button>
      </div>
    </div>
  );
};

export default User;
