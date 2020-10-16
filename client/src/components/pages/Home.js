import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import NavContext from "../../context/nav/navContext";
import SideNav from "../../components/layout/SideNav";
import BottomNav from "../../components/layout/BottomNav";
import Profile from "../../components/main/Profile";
import Chat from "../../components/main/Chat";
import SearchUsers from "../../components/main/SearchUsers";
import UpdateProfile from "../../components/main/UpdateProfile";
import Spinner from "../../components/layout/Spinner";
import UsersContext from "../../context/users/usersContext";
import Confirm from "./subs/Confirm";
import ViewProfile from "./subs/ViewProfile";
import io from "socket.io-client";
const ENDPOINT = "/";
var socket;
const Home = (props) => {
  const navContext = useContext(NavContext);
  const { setNav, active } = navContext;

  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated, user, loader } = authContext;

  const usersContext = useContext(UsersContext);
  const { confirm, profile, message, getUnread, unreadAmount } = usersContext;

  useEffect(() => {
    setNav("/");
    loadUser();
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    socket = io.connect(ENDPOINT);
    user && socket.emit("storeClientInfo", { customId: user._id });
    user && getUnread();
    // eslint-disable-next-line
  }, [user]);

  return (
    <section className="home">
      {unreadAmount && unreadAmount !== 0 ? (
        <span className="notify">
          <i className="fas fa-envelope"></i> You have unread messages
        </span>
      ) : null}
      {confirm || profile ? (
        <Fragment>
          <div className="overlay"></div>
          <div className="alert">
            {confirm && <Confirm />}
            {profile && <ViewProfile />}
          </div>
        </Fragment>
      ) : null}
      <div className="sideNav">
        <SideNav user={user} />
      </div>
      <div className="bottomNav">{!message && <BottomNav />}</div>
      <div className="main" id="main">
        {user && (
          <div>
            {active === "profile" ? (
              <Profile user={user} />
            ) : active === "chat" ? (
              <Chat user={user} socket={socket} />
            ) : active === "search" ? (
              <SearchUsers user={user} />
            ) : active === "update" ? (
              <UpdateProfile user={user} />
            ) : null}
          </div>
        )}
        {loader && <Spinner />}
      </div>
    </section>
  );
};

export default Home;
