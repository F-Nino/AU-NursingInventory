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
          <span>
            <h2>
              <b>{this.props.name}</b>
              {"   "}
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
