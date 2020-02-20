import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = connect(state => ({
  authState: state.authState
}))(({ component: Component, authState: authState, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authState.isSignedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
));

export default PrivateRoute;
