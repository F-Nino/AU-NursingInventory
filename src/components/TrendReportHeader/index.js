import React, { Component } from "react";
import TableItem from "../TableItem";

class trendReportHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      items: props.items,
      open: false,
      count: 0
    };
  }

  handleHeaderClick = categoryId => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  ItemList = () => {
    if (this.state.open && this.props.items != null) {
      return (
        <div className="table_holder">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Last Updated</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => (
                <TableItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  incrementCount = countToIncrementBy => {
    let count = { ...this.state.count };
    count += countToIncrementBy;
    this.setState({ count });
  };

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      let count = 0;
      if (this.props.items !== null) {
        this.props.items.forEach(item => {
          count += item.count;
        });
        this.setState({ count });
      }
    }
  }

  render() {
    return (
      <div className="section">
        <div
          className="jumbotron-mini text-center"
          onClick={() => this.handleHeaderClick(this.state.id)}
        >
          <span>
            <h2>
              <b>{this.state.name}</b>
              {this.state.count}
            </h2>
          </span>
        </div>
        {this.state.open && this.props.items != null && (
          <div className="table_holder">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Last Updated</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {this.props.items.map(item => (
                  <TableItem item={item} key={item.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default trendReportHeader;
