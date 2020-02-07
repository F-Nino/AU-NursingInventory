import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
//import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import { userLogOut } from "../../redux/actions/user.js";

const Logo = () => (
  <div className="logo">
    <span>FNBJ</span>
  </div>
);

const Navigation = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  return currentUser ? <NavigationAuth /> : <NavigationNonAuth />;
};

const NavigationAuth = () => (
  <nav className="navigation nav-auth">
    <div className="logo-wrapper">
      <Logo />
    </div>
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.CREATE_BARCODE}>Create Barcode</Link>
      </li>
      <li>
        <Link to={ROUTES.SCAN}> Scan</Link>
      </li>
      <li>
        <Link to={ROUTES.REPORT}> Report</Link>
      </li>
      <li>
        <Link to={ROUTES.TREND_REPORT}> Trend Report</Link>
      </li>
      <li>
        <Link to={ROUTES.LOGIN}>Logout</Link>
      </li>
    </ul>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="navigation nav-not-auth">
    <div className="logo-wrapper">
      <Logo />
    </div>
  </nav>
);
const mapStateToProps = state => ({
  currentUser: state.authState.currentUser
});

const mapDispatchToProps = dispatch => ({
  userLogOut: () => dispatch(userLogOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
