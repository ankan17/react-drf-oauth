import React from "react";
import { connect } from "react-redux";

import { GoogleLoginButton } from "../components";
import { convertGoogleToken } from "../actions/authActions";

const LandingPage = props => {
  return (
    <div className="container">
      <h1 className="heading">Landing Page! Login to continue...</h1>
      <GoogleLoginButton
        handleLogin={token => props.convertGoogleToken(token)}
      />
      {/* <button className="loginBtn loginBtn--facebook">
        Login with Facebook
      </button> */}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  convertGoogleToken: token => dispatch(convertGoogleToken(token))
});

export default connect(
  null,
  mapDispatchToProps
)(LandingPage);
