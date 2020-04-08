import React, { Component } from "react";
import LastFiveScanned from "../../components/LastFiveScanned";
import AttentionNeeded from "../../components/AttentionNeeded";
import axios from "axios";
import { apiRoute } from "../../constants/routes";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "In",
      scannedInObject: [],
      scannedOutObject: [],
    };
  }
  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
    console.log(event.target.value);
  };

  getLabelClassName = (value) => {
    let classNameForLabel = "label-for-button ";
    if (value === this.state.selectedOption) {
      classNameForLabel += "active-button";
    }
    return classNameForLabel;
  };

  componentDidMount() {
    axios
      .get(apiRoute + "get_last_five")
      .then((response) => {
        this.setState({ scannedInObject: response.data.data });
      })
      .catch((error) => console.log(error));
    axios
      .get(apiRoute + "get_last_five_scanned_out")
      .then((response) => {
        this.setState({ scannedOutObject: response.data.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="radio-button-wrapper home">
          <label className={this.getLabelClassName("In")} for="radio1">
            Scanned In
          </label>
          <input
            type="radio"
            id="radio1"
            name="itemsScanned"
            value="In"
            checked={this.state.selectedOption === "In"}
            onChange={this.handleOptionChange}
          />

          <label className={this.getLabelClassName("Out")} for="radio2">
            Scanned Out
          </label>
          <input
            type="radio"
            name="itemsScanned"
            value="Out"
            id="radio2"
            checked={this.state.selectedOption === "Out"}
            onChange={this.handleOptionChange}
          />
        </div>

        {this.state.selectedOption === "In" ? (
          <LastFiveScanned object={this.state.scannedInObject} header={"In"} />
        ) : null}
        {this.state.selectedOption === "Out" ? (
          <LastFiveScanned
            object={this.state.scannedOutObject}
            header={"Out"}
          />
        ) : null}
        <AttentionNeeded />
      </div>
    );
  }
}
export default Home;
