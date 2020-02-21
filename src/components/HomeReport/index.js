import React, { Component } from "react";
import Category from "../Category";
import { reportDataFetch } from "../../redux/actions/reportPage.js";
import { connect } from "react-redux";

class report extends Component {
  state = {};

  componentDidMount() {
    this.props.reportDataFetch().then(() => {
      console.log(this.props.categoryInfo);
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-center mt-4">Inventory Overview</h1>
        <Category />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoryInfo: state.reportState.reportData
});

const mapDispatchToProps = dispatch => ({
  reportDataFetch: () => dispatch(reportDataFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(report);
