import React, { Component } from "react";
import axios from "axios";
import AttentionNeededHeader from "../AttentionNeededHeader";

class attentionNeeded extends Component {
  state = {
    headers: {}
  };

  componentWillMount() {
    axios
      .get(`http://localhost:3000/api/v1/threshold_items`, {
        headers: {
          "Access-Control-Allow-Origin": true,
          crossorigin: true
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ headers: res.data.data });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    const categoryKeys = Object.keys(this.state.headers);
    return (
      <div>
        <h2 className="text-center">Attention Needed</h2>
        {this.state.headers !== null &&
          categoryKeys.map((key, index) => (
            <AttentionNeededHeader
              key={index}
              name={key}
              items={this.state.headers[key]}
            />
          ))}
      </div>
    );
  }
}

export default attentionNeeded;
