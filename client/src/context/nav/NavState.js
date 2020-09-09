import React, { useReducer } from "react";
import navReducer from "./navReducer";
import navContext from "./navContext";

import {
  SET_PROFILE,
  SET_CHAT,
  SET_SEARCH,
  SET_FOLLOWERS,
  SET_FOLLOWING,
  SET_UPDATE,
} from "../types";

const NavState = (props) => {
  const initialState = {
    active: "profile",
    follow: "followers",
  };

  const [state, dispatch] = useReducer(navReducer, initialState);

  const setProfile = () => dispatch({ type: SET_PROFILE });
  const setChat = () => dispatch({ type: SET_CHAT });
  const setSearch = () => dispatch({ type: SET_SEARCH });
  const setUpdate = () => dispatch({ type: SET_UPDATE });
  const setFollowers = () => dispatch({ type: SET_FOLLOWERS });
  const setFollowing = () => dispatch({ type: SET_FOLLOWING });

  return (
    <navContext.Provider
      value={{
        active: state.active,
        follow: state.follow,
        setProfile,
        setChat,
        setSearch,
        setFollowers,
        setFollowing,
        setUpdate,
      }}
    >
      {props.children}
    </navContext.Provider>
  );
};

export default NavState;
