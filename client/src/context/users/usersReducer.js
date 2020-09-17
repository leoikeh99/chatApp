import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  SET_LOADER,
  SEARCH_USERS,
  SET_LOADER2,
  SET_ERROR,
  FOLLOW_USER,
  UNFOLLOW_USER,
  CONFIRM,
  CLEAR_CONFIRM,
  CLEAR_STATUS,
  CLEAR_UPDATE,
  UPDATE_FAIL,
  UPDATE_SUCCESS,
  VIEW_PROFILE,
  CLEAR_VIEW,
  SEARCH_FAIL,
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
    case SEARCH_FAIL:
      return {
        ...state,
        users: [],
        loader: null,
      };

    case SET_LOADER:
      return {
        ...state,
        loader: true,
      };

    case SET_LOADER2:
      return {
        ...state,
        loader2: true,
      };

    case CONFIRM:
      return {
        ...state,
        confirm: action.payload,
      };

    case VIEW_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    case CLEAR_VIEW:
      return {
        ...state,
        profile: null,
      };
    case CLEAR_CONFIRM:
      return {
        ...state,
        confirm: null,
      };

    case CLEAR_STATUS:
      return {
        ...state,
        status: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loader2: null,
      };

    case FOLLOW_USER:
      const data = state.users.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            following: true,
          };
        } else {
          return user;
        }
      });
      return {
        ...state,
        loader2: null,
        status: action.payload,
        users: data,
      };

    case UNFOLLOW_USER:
      const data2 = state.users.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            following: false,
          };
        } else {
          return user;
        }
      });
      return {
        ...state,
        loader2: null,
        users: data2,
        status: action.payload,
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        updateStatus: action.payload,
      };

    case CLEAR_UPDATE:
      return {
        ...state,
        updateStatus: null,
      };

    case UPDATE_FAIL:
      return {
        ...state,
        updateFail: action.payload,
      };
  }
};
