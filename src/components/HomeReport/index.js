import React, { Component } from "react";
import Category from "../Report/category";
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
        <h3 className="text-center mt-4">Inventory Overview</h3>
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
