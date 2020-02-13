import React, { Component } from "react";
import LastFiveScanned from "../../components/Last5Scanned";
import Report from "../../components/HomeReport";

import LastFiveScanned from "../../components/LastFiveScanned";

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
