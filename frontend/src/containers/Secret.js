import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSecrets } from "../actions/secretActions";

class SecretComponent extends Component {
  componentDidMount() {
    this.props.fetchSecrets();
  }
  render() {
    const { secrets } = this.props.secrets;
    return (
      <div>
        <h1>This is secret component!</h1>
        <ul>
          {secrets.map((obj, index) => (
            <li key={index}>
              {obj.key}: {obj.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secrets: state.secret
});

export default connect(
  mapStateToProps,
  { fetchSecrets }
)(SecretComponent);
