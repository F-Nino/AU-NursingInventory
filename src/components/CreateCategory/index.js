import React, { Component } from "react";
import axios from "axios";

class CategoryForm extends Component {
  constructor() {
    super();
    this.state = {
      categoryName: "",
      message: "",
      fontType: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.categoryName !== "") {
      axios
        .post(`http://localhost:3000/api/v1/categories`, {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true
          },
          category: {
            name: this.state.categoryName
          }
        })
        .then(res => {
          this.setState({ message: "Category Created Successfully" });
          this.setState({ fontType: "green" });
        })
        .catch(error => {
          console.log("error", error);
          this.setState({ message: "Name already taken" });
          this.setState({ fontType: "#6b0103" });
        });
    } else {
      this.setState({ message: "Name cannot be empty" });
      this.setState({ fontType: "#6b0103" });
    }
  };

  render() {
    return (
      <div>
        <h1 className="text-center pt-3">
          <u>Create Category</u>
        </h1>

        <div className="text-center">
          <span className="message" style={{ color: this.state.fontType }}>
            {this.state.message}
          </span>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="row py-2">
            <div className="col-2"></div>
            <label htmlFor="itemName" className="col-2">
              <h2>Name</h2>
            </label>
            <div className="col-6">
              <input
                className="form-control"
                name="categoryName"
                type="text"
                value={this.props.categoryName}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-2"></div>
          </div>
          <div className="row py-2">
            <div className="col-4"></div>
            <div className="col-4 text-center">
              <button className="button ts-button" type="submit">
                <span className="temp">Create Category</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CategoryForm;
