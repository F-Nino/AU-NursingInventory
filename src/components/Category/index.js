import React, { Component } from "react";
import Header from "../Header";
import { connect } from "react-redux";

class category extends Component {
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
        <Header
          key={key}
          name={key}
          header={this.props.categoryInfo[key]}
          onItemEdit={this.props.onItemEdit}
        />
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

export default connect(mapStateToProps, null)(category);
