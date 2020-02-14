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

      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.CREATE_BARCODE} component={CreateBarcode} />
      <Route exact path={ROUTES.REPORT} component={Report} />
      <Route exact path={ROUTES.SCAN} component={Scan} />
      <Route exact path={ROUTES.TREND_REPORT} component={TrendReport} />
    </div>
  </Router>
);

export default App;
