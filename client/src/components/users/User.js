import React, { useContext } from "react";
import profile_pic from "../layout/img/profilepic.png";
import moment from "moment";
import UsersContext from "../../context/users/usersContext";

const User = ({ user }) => {
  const usersContext = useContext(UsersContext);
  const { followUser, setConfirm, viewProfile } = usersContext;
  const { username, bio, id, joined, following, followed } = user;
  return (
    <div className="card">
      <img src={profile_pic} alt="" />
      <h3 onClick={() => viewProfile({ username, bio, joined })}>
        @{username}
      </h3>
      <p>Joined at: {moment(joined).format("LL")}</p>
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
    </div>
  );
};

export default User;
