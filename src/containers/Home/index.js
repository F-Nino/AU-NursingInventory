import React, { Component } from "react";
import LastFiveScanned from "../../components/LastFiveScanned";
import Report from "../../components/HomeReport";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <LastFiveScanned />
        <Report />
      </div>
    );
  }
}
export default Home;
