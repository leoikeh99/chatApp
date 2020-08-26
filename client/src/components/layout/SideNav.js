import React, { useContext } from "react";
import navContext from "../../context/nav/navContext";

const SideNav = () => {
  const NavContext = useContext(navContext);
  const { active, setProfile, setChat, setSearch } = NavContext;
  return (
    <div>
      <ul>
        <li
          onClick={setProfile}
          className={active === "profile" ? "color-secondary" : null}
        >
          <i className="fa fa-user fa-2x" aria-hidden="true"></i>
        </li>
        <li
          onClick={setChat}
          className={active === "chat" ? "color-secondary" : null}
        >
          <i className="fas fa-comment-alt fa-2x"></i>
        </li>
        <li
          onClick={setSearch}
          className={active === "search" ? "color-secondary" : null}
        >
          <i className="fas fa-search fa-2x"></i>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
