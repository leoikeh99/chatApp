import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";

import {
  SET_LOADER,
  SET_ERROR,
  LOGIN,
  LOGOUT,
  LOGIN_FAIL,
  REGISTER,
  REGISTER_FAIL,
  GET_USER,
  USER_FAIL,
  CLEAR_ERROR,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    error: null,
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loader: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const register = async (data) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", data, config);
      dispatch({ type: REGISTER, payload: res.data });
      setAuthToken(localStorage.token);
    } catch (err) {
      console.log(err);
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  const login = async (data) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", data, config);
      dispatch({ type: LOGIN, payload: res.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: USER_FAIL, payload: err });
    }
  };

  const logout = () => dispatch({ type: LOGOUT });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        loader: state.loader,
        user: state.user,
        loadUser,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
