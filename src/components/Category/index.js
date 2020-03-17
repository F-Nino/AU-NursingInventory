import React, { Component } from "react";
import Header from "../Header";
import { connect } from "react-redux";

class category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let categoryKeys = Object.keys(this.props.categoryInfo);
    return (
      this.props.categoryInfo !== null &&
      categoryKeys.map(key => (
        <Header
          key={key}
          name={key}
          items={this.props.categoryInfo[key]}
          onItemEdit={this.props.onItemEdit}
          onItemDelete={this.props.onItemDelete}
        />
      ))
    );
  }
}

const mapStateToProps = state => ({
  categoryInfo: state.reportState.reportData
});

export default connect(mapStateToProps, null)(category);
