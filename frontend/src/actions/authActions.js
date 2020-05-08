import {
  GET_AUTH_STATE,
  CONVERT_GOOGLE_TOKEN_SUCCESS,
  HANDLE_GOOGLE_LOGOUT
} from "./constants";

import { URL, DJANGO_CLIENT_ID, DJANGO_CLIENT_SECRET } from "../config";

export const getAuthState = () => {
  const token = localStorage.getItem("GOOGLE_ACCESS_TOKEN");
  if (token) {
    return {
      type: GET_AUTH_STATE,
      payload: {
        authenticated: true,
        token: token
      }
    };
  } else {
    return {
      type: GET_AUTH_STATE,
      payload: {
        authenticated: false
      }
    };
  }
};

export const convertGoogleToken = access_token => async dispatch => {
  const searchParams = new URLSearchParams();
  searchParams.set("grant_type", "convert_token");
  searchParams.set("client_id", DJANGO_CLIENT_ID);
  searchParams.set("client_secret", DJANGO_CLIENT_SECRET);
  searchParams.set("backend", "google-oauth2");
  searchParams.set("token", access_token);
  try {
    let response = await fetch(`${URL}/auth/convert-token/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: searchParams
    });
    const json = await response.json();
    dispatch(convertGoogleTokenSuccess(json));
  } catch (err) {
    console.log(err);
  }
};

export const handleGoogleLogout = () => {
  localStorage.removeItem("GOOGLE_ACCESS_TOKEN");
  localStorage.removeItem("GOOGLE_REFRESH_TOKEN");
  localStorage.removeItem("GOOGLE_TOKEN_EXPIRY");
  return {
    type: HANDLE_GOOGLE_LOGOUT
  };
};

export const convertGoogleTokenSuccess = json => {
  localStorage.setItem("GOOGLE_ACCESS_TOKEN", json.access_token);
  localStorage.setItem("GOOGLE_REFRESH_TOKEN", json.refresh_token);
  let expiryDate = Math.round(new Date().getTime() / 1000) + json.expires_in;
  localStorage.setItem("GOOGLE_TOKEN_EXPIRY", expiryDate);
  return {
    type: CONVERT_GOOGLE_TOKEN_SUCCESS,
    payload: {
      token: json.access_token
    }
  };
};
