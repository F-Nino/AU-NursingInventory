import React, { Component } from "react";
import LastFiveScanned from "../../components/LastFiveScanned";
import AttentionNeeded from "../../components/AttentionNeeded";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <LastFiveScanned />
        <AttentionNeeded />
      </div>
    );
  }
}
export default Home;
