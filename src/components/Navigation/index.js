import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
//import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import { userLogOut } from "../../redux/actions/user";
import logo from '../../assets/images/club-logo.png';

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      pageClicked: "home"
    };
  }
  getPageClicked = pageClicked => {
    this.setState({ pageClicked });
  };

  getNavItemClassName = name => {
    console.log("init");
    if (name === this.state.pageClicked) {
      return "active";
    }
    return "not-active";
  };

  render() {
    const { currentUser, userLogOut } = this.props;
    return (
      <div>
        {currentUser ? (
          <NavigationAuth
            onPageClick={this.getPageClicked}
            getNavItemClassName={this.getNavItemClassName}
            logout={userLogOut}
          />
        ) : (
          <NavigationNonAuth />
        )}
      </div>
    );
  }
}

const Logo = () => (
  <div className="logo">
    <img className="nav-logo" src={logo} alt="logo"></img>
    <span>AIM</span>
  </div>
);

const NavigationAuth = props => (
  <nav className="navigation nav-auth">
    <div className="logo-wrapper">
      <Logo />
    </div>
    <ul>
      <li>
        <Link
          to={ROUTES.HOME}
          className={props.getNavItemClassName("home")}
          onClick={() => props.onPageClick("home")}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to={ROUTES.CREATE_BARCODE}
          className={props.getNavItemClassName("create")}
          onClick={() => props.onPageClick("create")}
        >
          Create
        </Link>
      </li>
      <li>
        <Link
          to={ROUTES.SCAN}
          className={props.getNavItemClassName("scan")}
          onClick={() => props.onPageClick("scan")}
        >
          Scan
        </Link>
      </li>
      <li>
        <Link
          to={ROUTES.REPORT}
          className={props.getNavItemClassName("report")}
          onClick={() => props.onPageClick("report")}
        >
          Inventory
        </Link>
      </li>
      <li>
        <Link
          to={ROUTES.TREND_REPORT}
          className={props.getNavItemClassName("trendReport")}
          onClick={() => props.onPageClick("trendReport")}
        >
          Trend Report
        </Link>
      </li>
      <li>
        <Link
          to={ROUTES.LOGIN}
          className={props.getNavItemClassName("logout")}
          onClick={props.logout}
        >
          Logout
        </Link>
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
