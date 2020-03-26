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
    this.setState({ [event.target.name]: event.target.value });
  };

  getTrendReportData = () => {
    let startDateAr = this.state.startDate.split("/");
    let endDateAr = this.state.endDate.split("/");
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
    this.setState({ startDate: oneMonthAgo, endDate: currentDay }, () => {
      this.getTrendReportData();
    });
  }

  render() {
    const categoryKeys = Object.keys(this.state.headers);
    return (
      <div>
          <h2 className="text-center inventory-title">Inventory Use</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row-one-trend-report">
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
            </div>
            <div className="row-two-trend-report">
              <button className="button item-search-button" type="submit">
                Search For Items
              </button>
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
