import React, { Component } from "react";
import axios from "axios";
import TrendReportHeader from "../../components/TrendReportHeader";
import { apiRoute } from "../../constants/routes";

class TrendReport extends Component {
  state = {
    startDate: "",
    endDate: "",
    headers: {},
    sortedHeaders: [],
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getTrendReportData = () => {
    let startDateAr = this.state.startDate.split("/");
    let endDateAr = this.state.endDate.split("/");
    let startDate =
      startDateAr[2] +
      "-" +
      startDateAr[0] +
      "-" +
      startDateAr[1] +
      " 00:00:00";
    let endDate =
      endDateAr[2] + "-" + endDateAr[0] + "-" + endDateAr[1] + " 23:59:59";
    axios
      .post(
        apiRoute + "scanned_out_by_category",
        {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true,
          },
        },
        {
          data: {
            start_date: startDate,
            end_date: endDate,
          },
        }
      )
      .then((res) => {
        let headers = res.data.data;
        let testing = {};
        const categoryKeys = Object.keys(headers);
        categoryKeys.forEach((key) => {
          let count = 0;
          if (headers[key] !== null) {
            headers[key].forEach((item) => {
              count += item.count;
            });
          }
          testing[key] = count;
        });
        console.log(testing);
        let entries = Object.entries(testing);
        let sortedHeaders = entries.sort((a, b) => b[1] - a[1]);
        this.setState({ headers: res.data.data, sortedHeaders }, () => {
          console.log(this.state);
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getTrendReportData();
  };

  componentDidMount() {
    let today = new Date();
    let currentDay =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    let oneMonthAgo =
      today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear();
    this.setState({ startDate: oneMonthAgo, endDate: currentDay }, () => {
      this.getTrendReportData();
    });
  }

  render() {
    //const categoryKeys = Object.keys(this.state.headers);
    return (
      <div className="page-wrapper">
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
          this.state.sortedHeaders.map((key, index) => (
            <TrendReportHeader
              key={index}
              name={key[0]}
              count={key[1]}
              items={this.state.headers[key[0]]}
            />
          ))}
      </div>
    );
  }
}

export default TrendReport;
