import React from "react";
import { connect } from "react-redux";

import { GoogleLogoutButton } from "../components";
import { handleGoogleLogout } from "../actions/authActions";

const HomePage = props => (
  <div className="container">
    <h1 className="heading">Homepage! You are logged in!</h1>
    <GoogleLogoutButton logout={() => props.handleGoogleLogout()} />
  </div>
);

const mapDispatchToProps = dispatch => ({
  handleGoogleLogout: () => dispatch(handleGoogleLogout())
});

export default connect(
  null,
  mapDispatchToProps
)(HomePage);
