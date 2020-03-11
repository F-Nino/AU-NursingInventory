import React, { Component } from "react";
import Item from "../../components/CreateItem";
import Category from "../../components/CreateCategory";

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

  getClassName = buttonName => {
    let classes = "btn btn-secondary mt-3 ";
    classes += this.state.selectedOption === buttonName && "active";
    return classes;
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="btn-group btn-group-toggle create-buttons"
              data-toggle="buttons"
            >
              <label className={this.getClassName("itemButton")}>
                <input
                  type="radio"
                  value="itemButton"
                  name="formRendered"
                  autoComplete="off"
                  checked={this.state.selectedOption === "itemButton"}
                  onChange={this.handleOptionChange}
                />
                Item
              </label>
              <label className={this.getClassName("categoryButton")}>
                Category
                <input
                  type="radio"
                  value="categoryButton"
                  name="formRendered"
                  checked={this.state.selectedOption === "categoryButton"}
                  onChange={this.handleOptionChange}
                />
              </label>
            </div>
          </div>
        </div>

        {this.state.selectedOption === "itemButton" ? <Item /> : null}
        {this.state.selectedOption === "categoryButton" ? <Category /> : null}
      </div>
    );
  }
}

export default CreateBarcode;
