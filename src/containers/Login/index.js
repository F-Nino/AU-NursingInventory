import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <form>
        <input placeholder="username" />
        <input placeholder="password" />
        <button>Sign In</button>
      </form>
    );
  }
}

export default Login;
