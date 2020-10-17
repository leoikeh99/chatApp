import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "../../context/nav/navContext";
import AuthContext from "../../context/auth/authContext";

const NavBar = () => {
  const navContext = useContext(NavContext);
  const { nav } = navContext;

  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  return (
    <div className="navBar">
      <div className="container">
        <div className="space">
          <h1 className="sac">Chatter</h1>
          {nav === "login" ? (
            <Link to="/register">Register</Link>
          ) : nav === "reg" ? (
            <Link to="/login">Login</Link>
          ) : nav === "/" ? (
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
