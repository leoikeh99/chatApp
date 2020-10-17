import {
  SET_LOADER,
  LOGIN,
  LOGOUT,
  REGISTER,
  REGISTER_FAIL,
  LOGIN_FAIL,
  GET_USER,
  USER_FAIL,
  CLEAR_ERROR,
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

    case LOGOUT:
    case USER_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
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

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
