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
            start_date: this.state.startDate,
            end_date: this.state.endDate
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
    console.log(categoryKeys);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-4">
              <label>Start Date</label>
              <input
                name="startDate"
                type="text"
                value={this.state.startDate}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-2">-</div>
            <div className="col-4">
              <label>End Date</label>
              <input
                name="endDate"
                type="text"
                value={this.state.endDate}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-2">
              <button className="button ts-button" type="submit">
                search for items
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
