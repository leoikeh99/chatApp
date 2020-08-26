import {
  SET_LOADER,
  SET_ERROR,
  LOGIN,
  LOGOUT,
  REGISTER,
  REGISTER_FAIL,
  LOGIN_FAIL,
  GET_USER,
  USER_FAIL,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: localStorage.getItem("token"),
        error: null,
        isAuthenticated: true,
      };
    case USER_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loader: null,
        token: null,
        error: action.payload,
        isAuthenticated: null,
        user: null,
      };

    case GET_USER:
      return {
        ...state,
        loader: null,
        user: action.payload,
        isAuthenticated: true,
      };

    case SET_LOADER:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
};
