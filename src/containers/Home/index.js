import React, { Component } from "react";
import LastFiveScanned from "../../components/LastFiveScanned";
import AttentionNeeded from "../../components/AttentionNeeded";
import LastFiveOut from "../../components/LastFiveOut";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "In"
    };
  }
  handleOptionChange = event => {
    this.setState({ selectedOption: event.target.value });
    console.log(event.target.value);
  };

  getLabelClassName = value => {
    let classNameForLabel = "label-for-button ";
    if (value === this.state.selectedOption) {
      classNameForLabel += "active-button";
    }
    return classNameForLabel;
  };

  render() {
    return (
      <div className="home-wrapper">
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

        {this.state.selectedOption === "In" ? <LastFiveScanned /> : null}
        {this.state.selectedOption === "Out" ? <LastFiveOut /> : null}
        <AttentionNeeded />
      </div>
    );
  }
}
export default Home;
