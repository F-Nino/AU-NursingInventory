import React, { Component } from "react";
import CreateItem from "../../components/CreateItem";
import CreateCategory from "../../components/CreateCategory";

class CreateBarcode extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: "itemButton"
    };
  }

  handleOptionChange = event => {
    this.setState({ selectedOption: event.target.value });
    console.log(event.target.value);
  };

  getLabelClassName = value => {
    let classNameForLabel = "label-for-button ";
    if (value === this.state.selectedOption) {
      classNameForLabel += "active-button";
    }
    return classNameForLabel;
  };

  render() {
    return (
      <div className="create-barcode-wrapper">
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

        {this.state.selectedOption === "itemButton" ? <CreateItem /> : null}
        {this.state.selectedOption === "categoryButton" ? (
          <CreateCategory />
        ) : null}
      </div>
    );
  }
}

export default CreateBarcode;
