import React, { Component } from "react";

class item extends Component {
  constructor(props) {
    super(props);
  }

  handleDate = () => {
    var modifiedDate = new Date(this.props.item.updated_at);
    return modifiedDate.toDateString();
  };

  render() {
    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.description}</td>
        <td>{this.handleDate()}</td>
        <td>{this.props.item.count}</td>
      </tr>
    );
  }
}

export default item;
