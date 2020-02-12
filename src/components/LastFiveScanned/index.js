import React from "react";
import Item from "./item";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class LastFiveScanned extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastFive: []
    };
  }

  getLastFive() {
    axios
      .get("http://localhost:3000/api/v1/get_last_five")
      .then(response => {
        console.log(response);
        this.setState({ lastFive: response.data.data });
        console.log(this.state.lastFive);
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getLastFive();
  }

  render() {
    return (
      <div className="container">
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
              <Item key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default LastFiveScanned;
