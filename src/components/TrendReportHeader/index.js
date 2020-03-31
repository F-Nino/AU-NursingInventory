import React, { Component } from "react";
import TableItem from "../TableItem";

class trendReportHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      count: 0
    };
  }

  handleHeaderClick = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  updateCount() {
    let count = 0;
    if (this.props.items !== null) {
      this.props.items.forEach(item => {
        count += item.count;
      });
    }
    this.setState({ count });
  }

  componentDidMount() {
    this.updateCount();
  }

  componentDidUpdate(prevProps) {
    console.log("called");
    if (prevProps.items !== this.props.items) {
      this.updateCount();
    }
  }

  render() {
    return (
      <div className="section">
        <div
          className="jumbotron-mini text-center"
          onClick={() => this.handleHeaderClick()}
        >
          <div className="inventory-report-cat-header">
            <div className="cat-header-name">
              <h2 className="white-header">
                <b>{this.props.name}</b>
              </h2>
            </div>
            <div className="cat-header-stock">
              <h2 className="white-header">{this.state.count}</h2>
            </div>
          </div>
        </div>
        {this.state.open &&
          (this.props.items != null ? (
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
          ) : (
            <h2 className="text-center">This Category Is Empty</h2>
          ))}
      </div>
    );
  }
}

export default trendReportHeader;
