import React, { useEffect, useContext } from "react";
import moment from "moment";
import navContext from "../../context/nav/navContext";
import Following from "../../components/users/Following";

const Profile = ({ user }) => {
  const NavContext = useContext(navContext);
  const { follow, setFollowers, setFollowing } = NavContext;

  const { username, bio, createdAt } = user;
  return (
    <section className="profile">
      <div className="top">
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
          Followers
        </li>
        <li
          className={follow === "following" ? "active" : null}
          onClick={setFollowing}
        >
          Following
        </li>
      </ul>

      {follow === "following" ? <Following /> : null}
    </section>
  );
};

export default Profile;
