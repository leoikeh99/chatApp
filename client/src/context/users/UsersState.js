import React, { useReducer } from "react";
import usersReducer from "./usersReducer";
import usersContext from "./usersContext";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";

import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  SEARCH_USERS,
  SET_LOADER,
} from "../types";

const UsersState = (props) => {
  const initialState = {
    followers: null,
    following: null,
    loader: null,
    users: null,
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);

  const setLoader = () => dispatch({ type: SET_LOADER });

  const getFollowers = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/follow/followers");
      dispatch({ type: GET_FOLLOWERS, payload: res.data });
    } catch (err) {}
  };

  const getFollowing = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/follow/following");
      const following = res.data.map((data) => data.following);
      dispatch({ type: GET_FOLLOWING, payload: following });
    } catch (err) {
      console.error(err);
    }
  };

  const searchUsers = async (value) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      setLoader();
      const res = await axios.get(`/api/auth/?value=${value}`);
      dispatch({ type: SEARCH_USERS, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <usersContext.Provider
      value={{
        followers: state.followers,
        following: state.following,
        loader: state.loader,
        users: state.users,
        getFollowers,
        getFollowing,
        searchUsers,
      }}
    >
      {props.children}
    </usersContext.Provider>
  );
};

export default UsersState;
