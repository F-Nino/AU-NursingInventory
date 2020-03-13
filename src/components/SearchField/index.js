import React, { Component } from "react";
import axios from "axios";
import TableItem from "../TableItem";

class searchField extends Component {
  state = {
    items: []
  };

  handleSearch = () => {
    var wordSearch = document.getElementById("searchInputField").value;
    if (wordSearch === "") {
      this.setState({ items: [] });
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
        this.setState({ items: res.data.data });
      });
  };

  render() {
    return (
      <div className="search">
        <div className="row mb-2">
          <div className="col-3"></div>
          <div className="col-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search For Item"
              id="searchInputField"
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.handleSearch();
                }
              }}
            />
          </div>
          <div className="col-2">
            <button
              className="btn mb-2 btn-primary"
              onClick={() => this.handleSearch()}
            >
              Search
            </button>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12">
            {this.state.items.length > 0 && (
              <div className="table_holder">
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
          </div>
        </div>
      </div>
    );
  }
}

export default searchField;
