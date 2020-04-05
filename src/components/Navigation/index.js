import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
//import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import { userLogOut } from "../../redux/actions/user";
import logo from "../../assets/images/club-logo.png";

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      pageClicked: "home",
      isSandwichOpen: false,
    };
  }
  getPageClicked = (pageClicked) => {
    this.setState({ pageClicked, isSandwichOpen: false });
  };

  getNavItemClassName = (name) => {
    if (name === this.state.pageClicked) {
      return "active";
    }
    return "not-active";
  };

  onSandwichClick = () => {
    this.setState((prevState) => ({
      isSandwichOpen: !prevState.isSandwichOpen,
    }));
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
            openSandwich={this.onSandwichClick}
            isSandwichOpen={this.state.isSandwichOpen}
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

const NavigationAuth = (props) => (
  <div>
    <nav className="navigation nav-auth big-screen-nav-bar">
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

    <div className="small-screen-nav-bar">
      <nav className="navigation nav-auth ">
        <div className="logo-wrapper">
          <Logo />
        </div>
        <div className="sandwich">
          <button className="sandwich-button" onClick={props.openSandwich}>
            Heyo
          </button>
        </div>
      </nav>
      {props.isSandwichOpen && (
        <ul id="test" className="menu-sandwich-bar">
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
      )}
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <nav className="navigation nav-not-auth">
    <div className="logo-wrapper">
      <Logo />
    </div>
  </nav>
);

const mapStateToProps = (state) => ({
  currentUser: state.authState.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  userLogOut: () => dispatch(userLogOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
