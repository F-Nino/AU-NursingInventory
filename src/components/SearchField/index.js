import React, { Component } from "react";
import axios from "axios";
import TableItem from "../TableItem";

class searchField extends Component {
  state = {
    items: [],
    hasSearchedForItem: false
  };

  handleSearch = () => {
    var wordSearch = document.getElementById("searchInputField").value;
    if (wordSearch === "") {
      this.setState({ items: [], hasSearchedForItem: false });
      return;
    }
    axios
      .post(
        `http://localhost:3000/api/v1/search_field_item`,
        {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true,
            "Content-Type": "application/json"
          }
        },
        {
          data: { name: wordSearch }
        }
      )
      .then(res => {
        this.setState({ items: [] });
        this.setState({ items: res.data.data, hasSearchedForItem: true });
      });
  };

  render() {
    return (
      <div className="search-section">
        <div className="search-row-one">
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search For Item"
              id="searchInputField"
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.handleSearch();
                }
              }}
            />
          </div>
          <div className="search-button-wrapper">
            <button
              className="button search-report"
              onClick={() => this.handleSearch()}
            >
              Search
            </button>
          </div>
        </div>
        {this.state.items.length > 0 && (
          <div className="table-search-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Last Updated</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item => (
                  <TableItem key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {this.state.items.length === 0 && this.state.hasSearchedForItem && (
          <h2 className="text-center">No Results</h2>
        )}
      </div>
    );
  }
}

export default searchField;
