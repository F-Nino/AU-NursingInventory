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
    this.setState({ [event.target.name]: event.target.value, message: "" });
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
          this.setState({ message: "Category Created Successfully: " + this.state.categoryName });
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
        <h2 className="text-center">Create Category</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="rows">
            <input
              className="create-category-input"
              name="categoryName"
              type="text"
              placeholder="Name"
              value={this.props.categoryName}
              onChange={this.handleChange}
            />
          </div>

          <div className="button-row">
            <button className="button create-category-button" type="submit">
              Create
            </button>
          </div>
        </form>
        <div className="text-center">
          <span className="message" style={{ color: this.state.fontType }}>
            {this.state.message}
          </span>
        </div>
      </div>
    );
  }
}

export default CategoryForm;
