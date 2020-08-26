import {
  SET_PROFILE,
  SET_CHAT,
  SET_SEARCH,
  SET_FOLLOWERS,
  SET_FOLLOWING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        active: "profile",
      };
    case SET_CHAT:
      return {
        ...state,
        active: "chat",
      };
    case SET_SEARCH:
      return {
        ...state,
        active: "search",
      };
    case SET_FOLLOWERS:
      return {
        ...state,
        follow: "followers",
      };
    case SET_FOLLOWING:
      return {
        ...state,
        follow: "following",
      };
  }
};
