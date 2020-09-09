import React, { useContext } from "react";
import profile_pic from "../../components/layout/img/profilepic.png";
import { truncate } from "../../functions/helperFunctions";
import usersContext from "../../context/users/usersContext";

const User = ({ user, check }) => {
  const UsersContext = useContext(usersContext);
  const { followUser, loader2, viewProfile, setConfirm } = UsersContext;

  const { username, bio, id, followed, following, joined } = user;
  return (
    <section className="card">
      <img className="avatar" src={profile_pic} alt="" />
      <div>
        {followed && <div className="pill">follows you</div>}
        <h1 onClick={() => viewProfile({ username, bio, followed, joined })}>
          @{username}
        </h1>
        <p>Bio: {truncate(bio, 16)}</p>
        {following ? (
          <button className="btn-info" onClick={() => setConfirm(username, id)}>
            Unfollow
          </button>
        ) : (
          <button className="btn-success" onClick={() => followUser(id)}>
            Follow
          </button>
        )}
      </div>
    </section>
  );
};

export default User;
