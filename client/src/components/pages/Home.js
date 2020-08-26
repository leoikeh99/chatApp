import React, { useContext, useEffect } from "react";
import authContext from "../../context/auth/authContext";
import navContext from "../../context/nav/navContext";
import SideNav from "../layout/SideNav";
import Profile from "../main/Profile";
import Chat from "../main/Chat";
import SearchUsers from "../main/SearchUsers";

const Home = (props) => {
  const AuthContext = useContext(authContext);
  const { loadUser, user } = AuthContext;

  const NavContext = useContext(navContext);
  const { active } = NavContext;

  useEffect(() => {
    loadUser();
  }, []);
  return (
    user && (
      <div className="home">
        <div className="top">
          <div className="space">
            <h1 className="sac">Chatter</h1>
            <button to="/login">Logout</button>
          </div>
        </div>
        <div className="container2">
          <div id="body">
            <div className="sideNav">
              <SideNav />
            </div>
            <div className="mainStage">
              {active === "profile" ? (
                <Profile user={user} />
              ) : active === "chat" ? (
                <Chat user={user} />
              ) : active === "search" ? (
                <SearchUsers user={user} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
