import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import NavContext from "../../context/nav/navContext";
import SideNav from "../../components/layout/SideNav";
import BottomNav from "../../components/layout/BottomNav";
import Profile from "../../components/main/Profile";
import Chat from "../../components/main/Chat";
import SearchUsers from "../../components/main/SearchUsers";
import Spinner from "../../components/layout/Spinner";
import UsersContext from "../../context/users/usersContext";
import profile_pic from "../layout/img/profilepic.png";
import moment from "moment";

const Home = (props) => {
  const navContext = useContext(NavContext);
  const { setNav, active } = navContext;

  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated, user, loader } = authContext;

  const usersContext = useContext(UsersContext);
  const {
    confirm,
    clearConfirm,
    unfollowUser,
    profile,
    clearProfile,
  } = usersContext;

  useEffect(() => {
    setNav("/");
    loadUser();
  }, [isAuthenticated, props.history]);

  return (
    <section className="home">
      {confirm || profile ? (
        <Fragment>
          <div className="overlay"></div>
          <div className="alert">
            {confirm && (
              <div className="confirm">
                <p>Unfollow {confirm.name}?</p>
                <div className="buttons">
                  <button
                    className="btn-secondary"
                    onClick={() => unfollowUser(confirm.id)}
                  >
                    Unfollow
                  </button>
                  <button className="btn-primary" onClick={clearConfirm}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {profile && (
              <div className="viewProfile">
                <div onClick={clearProfile} className="close">
                  X
                </div>
                <img src={profile_pic} alt="" />
                <p>@{profile.username}</p>
                <p>Joined at: {moment(profile.joined).format("LL")}</p>
                <p>Bio: {profile.bio}</p>
              </div>
            )}
          </div>
        </Fragment>
      ) : null}
      <div className="sideNav">
        <SideNav />
      </div>
      <div className="bottomNav">
        <BottomNav />
      </div>
      <div className="main" id="main">
        {user && (
          <div>
            {active === "profile" ? (
              <Profile user={user} />
            ) : active === "chat" ? (
              <Chat user={user} />
            ) : active === "search" ? (
              <SearchUsers user={user} />
            ) : null}{" "}
          </div>
        )}
        {loader && <Spinner />}
      </div>
    </section>
  );
};

export default Home;
