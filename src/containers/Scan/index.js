import React, { Component } from "react";
import axios from "axios";

class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: "",
      checked: "add-button",
      addButton: true,
      deleteButton: false,
      detailsButton: false,
      showData: false,
      itemData: {}
    };
  }

  onButtonClickHandler = event => {
    event.preventDefault();
    const { barcode, addButton, deleteButton, detailsButton } = this.state;
    console.log("form clicked");
    //this.setState({ showMessage: true });
    console.log(barcode);
    let apiValue = "";
    if (addButton) {
      apiValue = "scan_in";
    }
    if (deleteButton) {
      apiValue = "scan_out";
    }

    if (detailsButton) {
      apiValue = "details api endpoint";
    }
    let apiLink = "http://localhost:3000/api/v1/" + apiValue;
    console.log("the api link based on button", apiLink);
    try {
      axios
        .post(apiLink, {
          barcode: barcode,
          count: 2
        })
        .then(resp => {
          if (resp == null) {
            console.log("null data resp");
          }
          if (resp.data.status == "ERROR") {
            console.log("Item not in db");
            window.alert("Item not in db");
          }
          //if resp.data.status == SUCCESS
          console.log("the resp", resp);
          this.setState({ itemData: resp.data.data, showData: true });
        })
        .catch(error => {
          console.log("error", error);
        });
    } catch {
      console.log("error from axios call in comp did mount");
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  callAdd = event => {
    event.preventDefault();
    console.log("add clicked");
    this.setState({ addButton: !this.state.addButton });
    console.log("add button state", this.state.addButton);
  };

  callDelete = event => {
    event.preventDefault();
    console.log("delete clicked");
    this.setState({ deleteButton: !this.state.deleteButton });
    console.log("delete button state", this.state.deleteButton);
  };

  callDetails = event => {
    event.preventDefault();
    console.log("details clicked");
    this.setState({ detailsButton: !this.state.detailsButton });
    console.log("details button state", this.state.detailsButton);
  };

  render() {
    const { barcode } = this.state;
    const isInvalid = barcode === "";
    return (
      <div className="scan-wrapper">
        <div className="container">
          <h1 className="text-center">Inventory Scanning</h1>

          <div classname="form-buttons">
            <button
              className="form-buttons"
              name="add-button"
              onClick={this.callAdd}
            >
              Add
            </button>

            <button
              className="form-buttons"
              name="delete-button"
              checked="true"
              onClick={this.callDelete}
            >
              Delete
            </button>

            <button
              className="form-buttons"
              name="seeDetails-button"
              onClick={this.callDetails}
            >
              Details
            </button>
          </div>
          <form onSubmit={this.onButtonClickHandler}>
            Barcode
            <input
              name="barcode"
              placeholder=""
              value={barcode}
              onChange={this.handleChange}
              className="scan-input"
            />
            <button className="scan-submit-button">Find Barcode</button>
          </form>
          {this.state.showData ? (
            <ul className="mt-3">
              <li>
                <b>Id:</b> {this.state.itemData.id}
              </li>
              <li>
                <b>Name:</b> {this.state.itemData.name}
              </li>
              <li>
                <b>Count:</b> {this.state.itemData.count}
              </li>
              <li>
                <b>Description:</b> {this.state.itemData.description}
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Scan;
