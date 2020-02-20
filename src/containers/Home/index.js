import React, { Component } from "react";
import Last5Scanned from "../../components/Last5Scanned";
import Report from "../../components/HomeReport";

import LastFiveScanned from "../../components/LastFiveScanned";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Last5Scanned />
        <Report />
      </div>
    );
  }
}
export default Home;
