import React, { useContext, useEffect } from "react";
import profile_pic from "../layout/img/profilepic.png";
import UsersContext from "../../context/users/usersContext";
import moment from "moment";
import Users from "../../components/users/Users";
import NavContext from "../../context/nav/navContext";

const Profile = ({ user }) => {
  const usersContext = useContext(UsersContext);
  const {
    getFollowers,
    getFollowing,
    followers,
    following,
    status,
    clearStatus,
    clearConfirm,
  } = usersContext;
  const navContext = useContext(NavContext);
  const { follow, setFollow, setActive } = navContext;
  const { username, _id, email, createdAt, bio, avatar } = user;

  useEffect(() => {
    getFollowers();
    getFollowing();
    clearStatus();
    clearConfirm();
    // eslint-disable-next-line
  }, [status]);

  return (
    <section className="profile">
      <div className="image">
        {avatar ? (
          <img src={`/api/auth/avatar/${_id}`} alt="" />
        ) : (
          <img src={profile_pic} alt="" />
        )}
      </div>
      <div className="cover">
        <div className="details">
          <div className="first">
            <div>
              <h2>@{username}</h2>
              <ul>
                <li>Email: {email}</li>
                <li>Joined at: {moment(createdAt).format("LL")}</li>
                <li>Bio: {bio}</li>
              </ul>
              <button className="edit" onClick={() => setActive("update")}>
                <i className="fas fa-edit" aria-hidden="true"></i> Edit Pofile
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav">
        <li
          onClick={() => setFollow("followers")}
          className={follow === "followers" ? "active" : null}
        >
          Followers: {followers.length}
        </li>
        <li
          onClick={() => setFollow("following")}
          className={follow === "following" ? "active" : null}
        >
          Following: {following.length}
        </li>
      </ul>
      {follow === "following" ? (
        <Users _id={_id} users={following} />
      ) : follow === "followers" ? (
        <Users _id={_id} users={followers} />
      ) : null}
    </section>
  );
};

export default Profile;
