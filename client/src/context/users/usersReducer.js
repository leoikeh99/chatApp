import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  SET_LOADER,
  SEARCH_USERS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
        loader: null,
      };

    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload,
        loader: null,
      };

    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loader: null,
      };

    case SET_LOADER:
      return {
        ...state,
        loader: true,
      };
  }
};
