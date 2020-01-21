import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <form>
        <h1>Login</h1>
        <label>Username:</label>
        <input type="text" name="username" placeholder="username" />
        <label>Password:</label>
        <input type="password" name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    );
  }
}

export default Login;
