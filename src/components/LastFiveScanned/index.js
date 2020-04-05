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
              <th width="15%">Name</th>
              <th width="65%">Description</th>
              <th width="12%">Last Updated</th>
              <th width="8%">Count</th>
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
