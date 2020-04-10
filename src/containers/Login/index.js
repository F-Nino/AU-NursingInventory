import React, { Component } from "react";
import { connect } from "react-redux";
import { userLoginFetch } from "../../redux/actions/user";
import * as ROUTES from "../../constants/routes";
import { Redirect, Route } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    const { username, password } = this.state;
    event.preventDefault();
    console.log(username, password);
    console.log("button pressed", this.props.userLoginFetch);
    this.props.userLoginFetch(username, password);
    this.props.history.push(ROUTES.HOME);
  };

  render() {
    const { error, username, password } = this.state;
    const { currentUser, isWrongLogin } = this.props;
    const isInvalid = password === "" || username === "";
    console.log("current", currentUser);

    if (currentUser != null) {
      console.log("user should be in ther store");
      return <Redirect to="/home" />;
    }

    return (
      <div className="registration-wrapper">
        <form onSubmit={this.handleSubmit}>
          <h1>Welcome</h1>

          <input
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
            className="au-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            className="au-input"
          />

          <button
            className="button au-button"
            disabled={isInvalid}
            type="submit"
          >
            Login
          </button>
          {error && <p>{error.message}</p>}
        </form>
        {isWrongLogin && (
          <div className="invalid-login">
            <span>Invalid Username and Password password</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authState.currentUser,
  isWrongLogin: state.authState.isWrongLogin,
});

const mapDispatchToProps = (dispatch) => ({
  userLoginFetch: (username, password) =>
    dispatch(userLoginFetch(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
