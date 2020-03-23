import React, { Component } from "react";
import TableItem from "../TableItem";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      items: props.items,
      open: false
    };
  }

  handleHeaderClick = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  handleDate = lastUpdate => {
    var modifiedDate = new Date(lastUpdate);
    return modifiedDate.toDateString();
  };

  render() {
    return (
      <div className="section">
        <div
          className="jumbotron-mini text-center attention-needed-header"
          onClick={() => this.handleHeaderClick()}
        >
          <span>
            <h2>
              <b>{this.state.name}</b>
            </h2>
          </span>
        </div>
        {this.state.open && this.state.items != null && (
          <div className="table_holder">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Last Updated</th>
                  <th>Count</th>
                  <th>Minimum Threshold</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{this.handleDate(item.updated_at)}</td>
                    <td>{item.count}</td>
                    <td>{item.threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default header;
