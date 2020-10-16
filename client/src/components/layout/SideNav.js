import React, { useContext   } from "react";
import navContext from "../../context/nav/navContext"; 

const SideNav = ({ user }) => {
  const NavContext = useContext(navContext);
  const { active, setActive } = NavContext;

  return (
    <div>
      <ul>
        <li
          onClick={() => setActive("profile")}
          className={
            active === "profile" || active === "update" ? "active" : null
          }
        >
          <i className="fa fa-user " aria-hidden="true"></i>
          <span className="text"> Profile</span>
        </li>
        <li
          onClick={() => setActive("chat")}
          className={active === "chat" ? "active" : null}
        >
          <i className="fas fa-comment-alt "></i>
          <span className="text"> Chat</span>
        </li>
        <li
          onClick={() => setActive("search")}
          className={active === "search" ? "active" : null}
        >
          <i className="fas fa-search "></i>
          <span className="text"> Search</span>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
