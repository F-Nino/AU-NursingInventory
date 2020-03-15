import React, { Component } from "react";
import ReportPage from "../../components/ReportPage";

class Report extends Component {
  render() {
    return (
      <div className="report-wrapper">
        <h2 className="text-center p-4">Inventory Report</h2>
        <ReportPage />
      </div>
    );
  }
}

export default Report;
