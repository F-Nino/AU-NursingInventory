import React from "react";
import TableItem from "../TableItem";
import axios from "axios";

class LastFiveOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastFiveOut: [],
    };
  }

  /*componentDidMount() {
    axios
      .get("http://localhost:3000/api/v1/get_last_five_scanned_out")
      .then(response => {
        this.setState({ lastFiveOut: response.data.data });
      })
      .catch(error => console.log(error));
  }*/

  render() {
    return (
      <div className="last-five-wrapper">
        <h1 className="mt-4 text-center">Last 5 Items Scanned Out</h1>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="10%">Name</th>
              <th width="70%">Description</th>
              <th width="10%">Last Updated</th>
              <th width="10%">Count</th>
            </tr>
          </thead>
          <tbody>
            {this.props.object.map((item) => (
              <TableItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default LastFiveOut;
