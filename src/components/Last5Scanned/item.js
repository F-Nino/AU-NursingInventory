import React, { Component } from "react";

class item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.item.id,
      name: props.item.name,
      description: props.item.description,
      lastModified: props.item.updated_at,
      count: props.item.count
    };
  }

  handleDate = () => {
    var modifiedDate = new Date(this.state.lastModified);
    return modifiedDate.toDateString();
  };

  render() {
    return (
      <tr>
        <td>{this.state.name}</td>
        <td>{this.state.description}</td>
        <td>{this.handleDate()}</td>
        <td>{this.state.count}</td>
      </tr>
    );
  }
}

export default item;
