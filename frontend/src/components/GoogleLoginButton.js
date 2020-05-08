import React from "react";
import GoogleLogin from "react-google-login";

import { GOOGLE_CLIENT_ID } from "../config";
import "../styles/Buttons.css";

const GoogleLoginButton = props => {
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      render={renderProps => (
        <button
          className="loginBtn loginBtn--google"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Login with Google
        </button>
      )}
      onSuccess={response => props.handleLogin(response.tc.access_token)}
      onFailure={err => console.error(err)}
    />
  );
};

export default GoogleLoginButton;
