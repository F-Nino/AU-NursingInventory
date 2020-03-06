import React, { Component } from "react";
import Header from "../Header";

class trendReportCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: {}
    };
  }

  itemLoad = () => {
    if (this.props.categoryInfo == null) {
      return null;
    } else {
      let categoryKeys = Object.keys(this.props.categoryInfo);
      return categoryKeys.map(key => (
        <Header key={key} name={key} header={this.props.categoryInfo[key]} />
      ));
    }
  };

  render() {
    return <div>{this.itemLoad()}</div>;
  }
}

const mapStateToProps = state => ({
  categoryInfo: state.reportState.reportData
});

export default trendReportCategory;
