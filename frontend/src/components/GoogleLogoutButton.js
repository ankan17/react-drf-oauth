import React from "react";
import { GoogleLogout } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../config";

const GoogleLogoutButton = props => (
  <GoogleLogout
    clientId={GOOGLE_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={() => props.logout()}
    onLogoutFailure={err => console.log(err)}
  />
);

export default GoogleLogoutButton;
