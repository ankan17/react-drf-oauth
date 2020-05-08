import { push } from "react-router-redux";

import { convertGoogleTokenSuccess } from "../actions/authActions";
import {
  HANDLE_GOOGLE_LOGOUT,
  TOKEN_REFRESHING,
  TOKEN_REFRESHED
} from "../actions/constants";
import { URL, DJANGO_CLIENT_ID, DJANGO_CLIENT_SECRET } from "../config";

const token_refresh = ({ dispatch, getState }) => {
  return next => action => {
    // Only run for async actions
    if (typeof action === "function") {
      if (
        localStorage.getItem("GOOGLE_ACCESS_TOKEN") &&
        localStorage.length > 0
      ) {
        const tokenExpirationTime = localStorage.getItem("GOOGLE_TOKEN_EXPIRY");
        // Get the current UNIX epoch time in seconds
        const currentTime = Math.round(new Date().getTime() / 1000);
        const timeLeft = tokenExpirationTime - currentTime;
        // Check if the token is expired => log the user out
        if (tokenExpirationTime && timeLeft <= 0) {
          localStorage.removeItem("GOOGLE_ACCESS_TOKEN");
          localStorage.removeItem("GOOGLE_REFRESH_TOKEN");
          localStorage.removeItem("GOOGLE_TOKEN_EXPIRY");
          dispatch(push("/"));
          return dispatch({ type: HANDLE_GOOGLE_LOGOUT });
        }
        // Check if the token is going to expire in less than 30mins - refresh it,
        // if it not already being refreshed
        let state = getState();
        if (
          !state.auth.refreshing &&
          tokenExpirationTime & (timeLeft <= 30 * 60)
        ) {
          dispatch({
            type: TOKEN_REFRESHING
          });
          var searchParams = new URLSearchParams();
          searchParams.set("grant_type", "refresh_token");
          searchParams.set("client_id", DJANGO_CLIENT_ID);
          searchParams.set("client_secret", DJANGO_CLIENT_SECRET);
          searchParams.set(
            "refresh_token",
            localStorage.getItem("GOOGLE_REFRESH_TOKEN")
          );
          fetch(`${URL}/auth/token/`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: searchParams
          })
            .then(response => response.json())
            .then(json => {
              dispatch(convertGoogleTokenSuccess(json));
              dispatch({ type: TOKEN_REFRESHED });
            })
            .then(() => next(action));
        } else {
          return next(action);
        }
      }
    }
    return next(action);
  };
};

export default token_refresh;
