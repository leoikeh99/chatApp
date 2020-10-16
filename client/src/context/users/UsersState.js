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
  SEARCH_FAIL,
  MESSAGE_USER,
  GET_CHAT,
  GET_CHAT_LIST,
  CLEAR_MESSAGE_USER,
  SET_CHAT_LIST,
  GET_ALL_UNREAD,
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
    messageUser: null,
    chat: null,
    chatList: null,
    unread: null,
    unreadAmount: null,
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
  const clearUsers = () => dispatch({ type: SEARCH_FAIL });
  const MessageUser = (data) => dispatch({ type: MESSAGE_USER, payload: data });
  const clearMessageUser = () => dispatch({ type: CLEAR_MESSAGE_USER });
  const setChatList = (list) =>
    dispatch({ type: SET_CHAT_LIST, payload: list });

  const getUnread = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/unread");
      dispatch({ type: GET_ALL_UNREAD, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const clearUnread = async (id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      await axios.put(`/api/unread/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const getChat = async (id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      setLoader2();
      const res = await axios.get(`/api/messages/${id}`);
      dispatch({ type: GET_CHAT, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const getChatList = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      setLoader2();
      const res = await axios.get(`/api/messages`);
      dispatch({ type: GET_CHAT_LIST, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

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
      clearUsers();
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
      console.log(id);
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

  const updateProfile = async (formData) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      setLoader2();
      const res = await axios.put("/api/users", formData, config);
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
        messageUser: state.messageUser,
        chat: state.chat,
        chatList: state.chatList,
        unread: state.unread,
        unreadAmount: state.unreadAmount,
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
        clearUsers,
        MessageUser,
        getChat,
        getChatList,
        clearMessageUser,
        setChatList,
        getUnread,
        clearUnread,
      }}
    >
      {props.children}
    </usersContext.Provider>
  );
};

export default UsersState;
