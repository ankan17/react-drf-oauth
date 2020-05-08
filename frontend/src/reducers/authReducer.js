import {
  GET_AUTH_STATE,
  CONVERT_GOOGLE_TOKEN_SUCCESS,
  HANDLE_GOOGLE_LOGOUT,
  TOKEN_REFRESHING,
  TOKEN_REFRESHED
} from "../actions/constants";

const initialState = {
  authenticated: undefined
};

const googleAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONVERT_GOOGLE_TOKEN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        token: action.payload.token
      };
    case GET_AUTH_STATE:
      return {
        ...state,
        authenticated: action.payload.authenticated,
        token: action.payload.token
      };
    case TOKEN_REFRESHING:
      return {
        ...state,
        refreshing: true
      };
    case TOKEN_REFRESHED:
      return {
        ...state,
        refreshing: false
      };
    case HANDLE_GOOGLE_LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null
      };
    default:
      return state;
  }
};

export default googleAuthReducer;
