import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "./PrivateRoute";
import { getAuthState } from "./actions/authActions";
import { HomePage, LandingPage, SecretComponent } from "./containers";

const Public = () => <h1>Public Page</h1>;

class App extends Component {
  componentDidMount() {
    this.props.getAuthState();
  }
  render() {
    const { auth } = this.props;
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={auth && auth.authenticated ? HomePage : LandingPage}
          />
          <Route path="/public" exact component={Public} />
          <PrivateRoute path="/secret" exact component={SecretComponent} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => ({
  getAuthState: () => dispatch(getAuthState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
