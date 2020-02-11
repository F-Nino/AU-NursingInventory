import React, { Component } from "react";
import { connect } from "react-redux";
import { userLoginFetch } from "../../redux/actions/user";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  handleSubmit = event => {
    const { username, password } = this.state;
    event.preventDefault();
    console.log(username, password);
    console.log("button pressed");
    this.props.userLoginFetch(username, password).then(() => {
      console.log(localStorage.getItem("token"));
      this.props.history.push(ROUTES.HOME);
    });
  };

  render() {
    const { error, username, password } = this.state;
    const { currentUser } = this.props;
    const isInvalid = password === "" || username === "";
    console.log("current", currentUser);
    if (currentUser != null) {
      return <Redirect to="/Home" />;
    }
    return (
      <div className="registration-wrapper">
        <form onSubmit={this.handleSubmit}>
          <div className="login-container">
            <h1>Welcome</h1>

            <input
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              className="ts-input"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              className="ts-input"
            />

            <button
              className="button ts-button"
              disabled={isInvalid}
              type="submit"
            >
              Login
            </button>
            {error && <p>{error.message}</p>}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authState.currentUser
});

const mapDispatchToProps = dispatch => ({
  userLoginFetch: (username, password) =>
    dispatch(userLoginFetch(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
