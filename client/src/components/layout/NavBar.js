import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "../../context/nav/navContext";

const NavBar = () => {
  const navContext = useContext(NavContext);
  const { nav } = navContext;
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
            <Link>Logout</Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
