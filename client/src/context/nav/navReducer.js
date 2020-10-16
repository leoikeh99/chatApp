import { SET_ACTIVE, SET_FOLLOW, SET_NAV } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };

    case SET_FOLLOW:
      return {
        ...state,
        follow: action.payload,
      };

    case SET_NAV:
      return {
        ...state,
        nav: action.payload,
      };
    default:
      return state;
  }
};
