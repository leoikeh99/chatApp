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
  SET_LOADER2,
  SET_ERROR,
  FOLLOW_USER,
  UNFOLLOW_USER,
  CONFIRM,
  CLEAR_CONFIRM,
  CLEAR_STATUS,
  UPDATE_SUCCESS,
  CLEAR_UPDATE,
  UPDATE_FAIL,
  VIEW_PROFILE,
  CLEAR_VIEW,
} from "../types";

const UsersState = (props) => {
  const initialState = {
    followers: [],
    following: [],
    loader: null,
    loader2: null,
    users: [],
    error: null,
    status: null,
    confirm: null,
    updateStatus: null,
    updateFail: null,
    profile: null,
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);

  const setLoader = () => dispatch({ type: SET_LOADER });
  const setLoader2 = () => dispatch({ type: SET_LOADER2 });
  const setConfirm = (name, id) =>
    dispatch({ type: CONFIRM, payload: { name, id } });
  const clearConfirm = () => dispatch({ type: CLEAR_CONFIRM });
  const clearStatus = () => dispatch({ type: CLEAR_STATUS });
  const clearUpdateStatus = () => dispatch({ type: CLEAR_UPDATE });
  const viewProfile = (data) => dispatch({ type: VIEW_PROFILE, payload: data });
  const clearProfile = () => dispatch({ type: CLEAR_VIEW });

  const getFollowers = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/follow/followers");
      dispatch({ type: GET_FOLLOWERS, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const getFollowing = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/follow/following");
      dispatch({ type: GET_FOLLOWING, payload: res.data });
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

  const followUser = async (id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoader2();
      const res = await axios.post("/api/follow", { id }, config);
      dispatch({ type: FOLLOW_USER, payload: res.data.msg, id: id });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
    }
  };

  const unfollowUser = async (id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoader2();
      const res = await axios.delete(`/api/follow/${id}`);
      console.log(res.data);
      dispatch({ type: UNFOLLOW_USER, payload: res.data.msg, id: id });
      clearConfirm();
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
      clearConfirm();
    }
  };

  const updateProfile = async (data) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put("/api/users", data, config);
      dispatch({ type: UPDATE_SUCCESS, payload: res.data.msg });
    } catch (err) {
      dispatch({ type: UPDATE_FAIL, payload: err.response.data.msg });
    }
  };

  return (
    <usersContext.Provider
      value={{
        followers: state.followers,
        following: state.following,
        loader: state.loader,
        loader2: state.loader2,
        error: state.error,
        status: state.status,
        users: state.users,
        confirm: state.confirm,
        updateStatus: state.updateStatus,
        updateFail: state.updateFail,
        profile: state.profile,
        getFollowers,
        getFollowing,
        searchUsers,
        followUser,
        unfollowUser,
        setConfirm,
        clearConfirm,
        clearStatus,
        updateProfile,
        clearUpdateStatus,
        viewProfile,
        clearProfile,
      }}
    >
      {props.children}
    </usersContext.Provider>
  );
};

export default UsersState;
