import React, { useEffect, useContext } from "react";
import moment from "moment";
import navContext from "../../context/nav/navContext";
import Following from "../../components/users/Following";
import Followers from "../../components/users/Followers";
import usersContext from "../../context/users/usersContext";
import Spinner from "../../components/layout/Spinner";

const Profile = ({ user }) => {
  const UsersContext = useContext(usersContext);
  const NavContext = useContext(navContext);

  const {
    following,
    getFollowing,
    followers,
    getFollowers,
    loader,
    status,
    clearStatus,
  } = UsersContext;
  const { follow, setFollowers, setFollowing, setUpdate } = NavContext;
  const { username, bio, createdAt } = user;

  useEffect(() => {
    clearStatus();
  }, []);

  useEffect(() => {
    getFollowers();
    getFollowing();

    setTimeout(() => {
      clearStatus();
    }, 3000);
  }, [status]);

  return (
    <section className="profile">
      {status && <div className="alert2">{status}</div>}
      <div className="top">
        <div className="edit">
          <i class="far fa-edit" onClick={setUpdate}></i>
        </div>

        <div className="flex">
          <img
            className="avatar"
            src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg"
            alt=""
          />
          <div>
            <h2>@{username}</h2>
            <div className="bio">Bio: {bio}</div>
            <p>Joined at: {moment(createdAt).format("LL")}</p>
          </div>
        </div>
      </div>

      <ul>
        <li
          className={follow === "followers" ? "active" : null}
          onClick={setFollowers}
        >
          {followers && `Followers: ${followers.length}`}
        </li>
        <li
          className={follow === "following" ? "active" : null}
          onClick={setFollowing}
        >
          {following && `Following: ${following.length}`}
        </li>
      </ul>
      {follow == "following" && following ? (
        <Following following={following} />
      ) : follow == "followers" && followers ? (
        <Followers followers={followers} />
      ) : loader ? (
        <Spinner />
      ) : null}
    </section>
  );
};

export default Profile;
