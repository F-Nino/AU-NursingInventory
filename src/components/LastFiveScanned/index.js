import React from "react";
import TableItem from "../TableItem";

class LastFiveScanned extends React.Component {
  render() {
    return (
      <div className="last-five-wrapper">
        <h1 className="mt-4 text-center">
          Last 5 Items Scanned {this.props.header}
        </h1>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Last Updated</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {this.props.object.map(item => (
              <TableItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default LastFiveScanned;
