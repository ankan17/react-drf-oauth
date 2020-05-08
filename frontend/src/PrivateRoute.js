import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  auth: { authenticated },
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated === false ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
