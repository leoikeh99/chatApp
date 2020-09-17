import React, { useReducer } from "react";
import navReducer from "./navReducer";
import navContext from "./navContext";

import { SET_ACTIVE, SET_FOLLOW, SET_NAV } from "../types";

const NavState = (props) => {
  const initialState = {
    active: "profile",
    follow: "followers",
    nav: "login",
  };

  const [state, dispatch] = useReducer(navReducer, initialState);

  const setActive = (active) => dispatch({ type: SET_ACTIVE, payload: active });
  const setFollow = (follow) => dispatch({ type: SET_FOLLOW, payload: follow });
  const setNav = (nav) => dispatch({ type: SET_NAV, payload: nav });

  return (
    <navContext.Provider
      value={{
        active: state.active,
        follow: state.follow,
        nav: state.nav,
        setNav,
        setActive,
        setFollow,
      }}
    >
      {props.children}
    </navContext.Provider>
  );
};

export default NavState;
