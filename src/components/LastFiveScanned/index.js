import React from "react";
import TableItem from "../TableItem";
import axios from "axios";

class LastFiveScanned extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastFive: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/api/v1/get_last_five")
      .then(response => {
        this.setState({ lastFive: response.data.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1 className="mt-4 text-center">last 5 items scanned</h1>
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
            {this.state.lastFive.map(item => (
              <TableItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default LastFiveScanned;
