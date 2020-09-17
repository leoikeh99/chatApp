import React, { useContext, useEffect } from "react";
import profile_pic from "../layout/img/profilepic.png";
import UsersContext from "../../context/users/usersContext";
import moment from "moment";
import Users from "../../components/users/Users";
import NavContext from "../../context/nav/navContext";
import Spinner from "../../components/layout/Spinner";

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
  const { follow, setFollow } = navContext;
  const { username, _id, email, createdAt, bio } = user;

  useEffect(() => {
    getFollowers();
    getFollowing();
    clearStatus();
    clearConfirm();
  }, [status]);

  return (
    <section className="profile">
      <div className="image">
        <img src={profile_pic} alt="" />
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
            </div>
          </div>
          {/* <div className="second">
            <div>
              <ul>
                <li>Followers: {followers.length}</li>
                <li>Following: {following.length}</li>
              </ul>
            </div>
          </div> */}
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
        <Users users={following} />
      ) : follow === "followers" ? (
        <Users users={followers} />
      ) : null}
    </section>
  );
};

export default Profile;
