import React, { Component } from "react";
import axios from "axios";
import TrendReportHeader from "../TrendReportHeader";

class trendReportPage extends Component {
  state = {
    startDate: "",
    endDate: "",
    headers: {}
  };

  handleInputChange = event => {
    if (this.state.startDate.length > event.target.value.length) {
      if (event.target.value.length === 0) {
        this.setState({ [event.target.name]: "  /  /    " }, () => {
          var input = document.getElementById("testing");
          input.setSelectionRange(0, 0);
        });
        return;
      }
      /*
      for (let i = 0; i < this.state.startDate.length; i++) {
        console.log(this.state.startDate[i]);
        console.log(event.target.value[i]);
        if (
          this.state.startDate[i] !== event.target.value[i] &&
          this.state.startDate[i] === "/"
        ) {
          console.log("heyo");
          event.target.value =
            this.state.startDate.substring(0, i - 1) +
            " " +
            this.state.startDate.substring(i, this.state.startDate.length);
          var input = document.getElementById("testing");
          input.setSelectionRange(i - 1, i - 1);
        }
      }*/

      for (let i = this.state.startDate.length - 1; i > 0; i--) {
        if (this.state.startDate[i] !== event.target.value[i]) {
          event.target.value =
            event.target.value.substring(0, i) +
            " " +
            event.target.value.substring(i, event.target.value.length);
          var input = document.getElementById("testing");
          input.setSelectionRange(i, i);
        }
      }
      console.log(event.target.value);
      if (event.target.value[5] !== "/") {
        if (event.target.value[5] === " ") {
          event.target.value =
            event.target.value.substring(0, 4) +
            "/" +
            event.target.value.substring(6, event.target.value.length);
        } else {
          event.target.value =
            event.target.value.substring(0, 5) +
            "/" +
            event.target.value.substring(5, event.target.value.length);
        }
        var input = document.getElementById("testing");
        input.setSelectionRange(4, 4);
        console.log(event.target.value);
      }
      if (event.target.value[2] !== "/") {
        if (event.target.value[2] === " ") {
          event.target.value =
            event.target.value.substring(0, 1) +
            "/" +
            event.target.value.substring(3, event.target.value.length);
        } else {
          event.target.value =
            event.target.value.substring(0, 2) +
            "/" +
            event.target.value.substring(2, event.target.value.length);
        }
        var input = document.getElementById("testing");
        input.setSelectionRange(1, 1);
      }

      this.setState({ [event.target.name]: event.target.value });
      return;
    }

    //console.log("heyo");
    //console.log(event.target.value);
    //let regex = /\s[0-9/]/g;
    if (event.target.value.length > 11) {
      console.log("too long wink");
      return;
    }
    for (let i = 0; i < event.target.value.length; i++) {
      if (
        event.target.value[i] !== "/" &&
        event.target.value[i] !== " " &&
        isNaN(event.target.value[i])
      ) {
        console.log("illegal");
        return;
      }
    }

    let inputFieldSplit = event.target.value.split("/");
    console.log(inputFieldSplit);
    this.setState({ [event.target.name]: event.target.value });
    for (let i = 0; i < inputFieldSplit.length; i++) {
      if (i < 2) {
        if (inputFieldSplit[i].length > 2) {
          for (let j = 0; j < inputFieldSplit[i].length; j++) {
            if (inputFieldSplit[i][j] === " ") {
              event.target.value =
                event.target.value.substring(0, i * 2 + j) +
                event.target.value.substring(
                  i * 2 + j + 1,
                  event.target.value.length
                );

              var input = document.getElementById("testing");
              input.setSelectionRange(i * 2 + j, i * 2);
              if (event.target.value[i * 2 + j + 1] === "/") {
                console.log("hetdfd");
                var input = document.getElementById("testing");
                input.setSelectionRange(i * 2 + j + 1, i * 2 + j + 1);
              }
              break;
            }
          }
        }
        if (
          inputFieldSplit[i].length === 2 &&
          event.target.value[i * 3 + 2] !== "/"
        ) {
          event.target.value =
            event.target.value.substring(0, i * 3 + 2) +
            "/" +
            event.target.value.substring(i * 3 + 2, event.target.value.length);
        }
      }
    }
    this.setState({ [event.target.name]: event.target.value });

    //console.log(event.target.value);
    //
    //if (event.target.value.match(regex) || event.target.value.length > 10) {
    //  console.log("error bro");
    // }
    /*
    let testingString = null;
    let checkLastCharacter = event.key;
    if (checkLastCharacter === "Backspace") {
      let stoppingPoint = event.target.value.length - 1;
      if (event.target.value[event.target.value.length - 1] === "/") {
        stoppingPoint = event.target.value.length - 2;
      }
      this.setState({
        [event.target.name]: event.target.value.substring(0, stoppingPoint)
      });
    } else if (checkLastCharacter !== "Backspace") {
      let regex = /\D/;
      if (
        checkLastCharacter.match(regex) ||
        event.target.value.length + 1 > 10
      ) {
        console.log("error bro");
      } else {
        testingString = event.target.value + event.key;
        if (testingString.length === 2 || testingString.length === 5) {
          testingString += "/";
        }
        this.setState({ [event.target.name]: testingString });
      }*/
  };

  getTrendReportData = () => {
    let startDateAr = this.state.startDate.split("/");
    let endDateAr = this.state.endDate.split("/");
    if (
      startDateAr[0].match(/[0-9]/g).length === 2 &&
      startDateAr[1].match(/[0-9]/g).length === 2 &&
      startDateAr[2].match(/[0-9]/g).length === 4
    ) {
      console.log("heyo");
    } else {
      alert("not correct format, format needs to be '00/00/0000'");
    }
    let startDate =
      startDateAr[2] + "-" + startDateAr[0] + "-" + startDateAr[1];
    let endDate =
      endDateAr[2] + "-" + endDateAr[0] + "-" + endDateAr[1] + " 23:59:59";
    axios
      .post(
        `http://localhost:3000/api/v1/scanned_out_by_category`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true
          }
        },
        {
          data: {
            start_date: startDate,
            end_date: endDate
          }
        }
      )
      .then(res => {
        this.setState({ headers: res.data.data });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getTrendReportData();
  };

  componentDidMount() {
    let today = new Date();
    let currentDay =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    let oneMonthAgo =
      today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear();
    if (today.getMonth() < 9) {
      currentDay = "0" + currentDay;
      oneMonthAgo = "0" + oneMonthAgo;
    }
    this.setState({ startDate: oneMonthAgo, endDate: currentDay }, () => {
      this.getTrendReportData();
    });
  }

  testing = event => {
    /*

    }*/
  };

  render() {
    const categoryKeys = Object.keys(this.state.headers);
    return (
      <div>
        <h2 className="text-center trend-report-title">Inventory Use</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row-trend-report">
            <div className="start-input-wrapper">
              <label>Start Date</label>
              <input
                name="startDate"
                type="text"
                value={this.state.startDate}
                onChange={this.handleInputChange}
                id="testing"
              />
            </div>

            <div className="end-input-wrapper">
              <label>End Date</label>
              <input
                name="endDate"
                type="text"
                value={this.state.endDate}
                onChange={this.handleInputChange}
              />
            </div>

            <div>
              <button className="button item-search-button" type="submit">
                Search For Items
              </button>
            </div>
          </div>
        </form>

        {this.state.headers !== null &&
          categoryKeys.map((key, index) => (
            <TrendReportHeader
              key={index}
              name={key}
              items={this.state.headers[key]}
            />
          ))}
      </div>
    );
  }
}

export default trendReportPage;
