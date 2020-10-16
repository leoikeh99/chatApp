import React, { useContext } from "react";
import navContext from "../../context/nav/navContext";

const BottomNav = () => {
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
          <i className="fa fa-user" aria-hidden="true"></i>
        </li>
        <li
          onClick={() => setActive("chat")}
          className={active === "chat" ? "active" : null}
        >
          <i className="fas fa-comment-alt"></i>
        </li>
        <li
          onClick={() => setActive("search")}
          className={active === "search" ? "active" : null}
        >
          <i className="fas fa-search"></i>
        </li>
      </ul>
    </div>
  );
};

export default BottomNav;
