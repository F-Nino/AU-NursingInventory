import React, { Component } from "react";
import CreateItem from "../../components/CreateItem";
import CreateCategory from "../../components/CreateCategory";
import axios from "axios";
import { apiRoute } from "../../constants/routes";

class CreateBarcode extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: "itemButton",
      categories: [],
    };
  }

  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
    console.log(event.target.value);
  };

  getLabelClassName = (value) => {
    let classNameForLabel = "label-for-button ";
    if (value === this.state.selectedOption) {
      classNameForLabel += "active-button";
    }
    return classNameForLabel;
  };

  getCategories = () => {
    axios
      .get(apiRoute + "/categories", {
        headers: {
          "Access-Control-Allow-Origin": true,
          crossorigin: true,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        try {
          this.setState({ categories: res.data.data });
        } catch {}
      });
  };

  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="radio-button-wrapper">
          <label className={this.getLabelClassName("itemButton")} for="radio1">
            Item
          </label>
          <input
            type="radio"
            id="radio1"
            value="itemButton"
            name="formRendered"
            checked={this.state.selectedOption === "itemButton"}
            onChange={this.handleOptionChange}
          />
          <label
            className={this.getLabelClassName("categoryButton")}
            for="radio2"
          >
            Category
          </label>
          <input
            type="radio"
            id="radio2"
            value="categoryButton"
            name="formRendered"
            checked={this.state.selectedOption === "categoryButton"}
            onChange={this.handleOptionChange}
          />
        </div>

        {this.state.selectedOption === "itemButton" ? (
          <CreateItem categories={this.state.categories} />
        ) : null}
        {this.state.selectedOption === "categoryButton" ? (
          <CreateCategory
            categories={this.state.categories}
            getCategories={this.getCategories}
          />
        ) : null}
      </div>
    );
  }
}

export default CreateBarcode;
