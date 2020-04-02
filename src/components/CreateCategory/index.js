import React, { Component } from "react";
import axios from "axios";
import TableItem from "../TableItem";

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      message: " ",
      fontType: ""
    };
  }

  handleChange = event => {
    if (event.target.value.length > 20) {
      this.setState({
        message: "ERROR: Category Name Cannot Exceed 20 Characters"
      });
    } else {
      this.setState({ [event.target.name]: event.target.value, message: "" });
    }
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
          this.setState({
            message: "Category Created Successfully: " + this.state.categoryName
          });
          this.setState({ fontType: "green" });
          this.props.getCategories();
        })
        .catch(error => {
          console.log("error", error);
          this.setState({ message: "Name Already Taken" });
          this.setState({ fontType: "#6b0103" });
        });
    } else {
      this.setState({ message: "Name Cannot Be Empty" });
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
              value={this.state.categoryName}
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
        <div className="create-category-header">
          <h2>Current Inventory Categories</h2>
        </div>
        <div className="category-table-wrapper">
          <div className="create-category-table">
            <table className="table table-bordered table-hover">
              <tbody>
                {this.props.categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryForm;
