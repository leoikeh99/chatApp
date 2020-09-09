import React, { useContext, useEffect, Fragment } from "react";
import authContext from "../../context/auth/authContext";
import navContext from "../../context/nav/navContext";
import usersContext from "../../context/users/usersContext";
import SideNav from "../layout/SideNav";
import Profile from "../main/Profile";
import Chat from "../main/Chat";
import SearchUsers from "../main/SearchUsers";
import Spinner from "../../components/layout/Spinner";
import BottomNav from "../../components/layout/BottomNav";
import UpdateProfile from "../../components/main/UpdateProfile";
import profile_pic from "../../components/layout/img/profilepic.png";
import moment from "moment";
import $ from "jquery";

const Home = () => {
  const AuthContext = useContext(authContext);
  const { loadUser, user, logout, loader } = AuthContext;

  const NavContext = useContext(navContext);
  const { active } = NavContext;

  const UsersContext = useContext(usersContext);
  const {
    confirm,
    unfollowUser,
    clearConfirm,
    loader2,
    error,
    profile,
    clearProfile,
  } = UsersContext;

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const alert = $(".alert");
    const overlay = $(".overlay");
    const viewProfile = $(".viewProfile");

    if (confirm) {
      alert.css("display", "inline-block");
      alert.css("animationName", "drop");
      overlay.css("display", "block");
    } else {
      alert.css("display", "none");
    }

    if (profile) {
      viewProfile.css("display", "inline-block");
      viewProfile.css("animationName", "drop");
      overlay.css("display", "block");
    } else {
      viewProfile.css("display", "none");
    }

    if (!profile && !confirm) {
      overlay.css("display", "none");
    }
  }, [confirm, profile]);

  return (
    <Fragment>
      {loader && <Spinner />}
      {user && (
        <div className="home">
          <div className="overlay"> </div>
          <div className="alert">
            {loader2 ? (
              <Spinner />
            ) : (
              <Fragment>
                <p>Unfollow @{confirm && confirm.name}?</p>
                <button
                  className="btn-info"
                  onClick={() => confirm && unfollowUser(confirm.id)}
                >
                  Unfollow
                </button>
                <button className="btn-success" onClick={() => clearConfirm()}>
                  Cancel
                </button>
              </Fragment>
            )}
          </div>

          {profile && (
            <div className="viewProfile">
              <img className="avatar" src={profile_pic} alt="" />
              <h1>@{profile.username}</h1>
              <p>Bio: {profile.bio}</p>
              <p>Joined: {moment(profile.joined).format("LL")}</p>
              <span className="close" onClick={clearProfile}>
                X
              </span>
            </div>
          )}

          <div className="top">
            <div className="space">
              <h1 className="sac">Chatter</h1>
              <button to="/login" className="logout" onClick={logout}>
                <i className="fas fa-power-off"></i> Logout
              </button>
            </div>
          </div>
          <div className="container2">
            <div id="body">
              <div className="sideNav">
                <SideNav />
              </div>
              <div className="mainStage">
                {error && <div className="error">error</div>}
                {active === "profile" ? (
                  <Profile user={user} />
                ) : active === "chat" ? (
                  <Chat user={user} />
                ) : active === "search" ? (
                  <SearchUsers user={user} />
                ) : active === "update" ? (
                  <UpdateProfile user={user} />
                ) : null}
              </div>
            </div>
          </div>
          <div className="bottomNav">
            <BottomNav />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
