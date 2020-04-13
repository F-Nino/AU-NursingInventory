import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../containers/Login";

import * as ROUTES from "../constants/routes";
import Home from "../containers/Home";
import CreateBarcode from "../containers/CreateBarcode";
import Report from "../containers/Report";
import Scan from "../containers/Scan";
import TrendReport from "../containers/TrendReport";
import Navigation from "../components/Navigation";
import PrivateRoute from "../PrivateRoute.js";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route path={ROUTES.LOGIN} component={Login} />
      <PrivateRoute path={ROUTES.HOME} component={Home} />
      <PrivateRoute path={ROUTES.CREATE_BARCODE} component={CreateBarcode} />
      <PrivateRoute path={ROUTES.REPORT} component={Report} />
      <PrivateRoute path={ROUTES.SCAN} component={Scan} />
      <PrivateRoute path={ROUTES.TREND_REPORT} component={TrendReport} />
    </div>
  </Router>
);

export default App;
