import React, { Component } from "react";
import LastFiveScanned from "../../components/LastFiveScanned";
import AttentionNeeded from "../../components/AttentionNeeded";

class Home extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <LastFiveScanned />
        <AttentionNeeded />
      </div>
    );
  }
}
export default Home;
