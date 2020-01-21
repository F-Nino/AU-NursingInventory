import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../containers/Login";

import * as ROUTES from "../constants/routes";
import Home from "../containers/Home";

const App = () => (
  <Router>
    <div>
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.HOME} component={Home} />
    </div>
  </Router>
);

export default App;
