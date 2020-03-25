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
      itemData: {},
      itemCount: 1
    };
  }

  onButtonClickHandler = event => {
    event.preventDefault();
    const { barcode, addButton, deleteButton, detailsButton } = this.state;
    this.setState({ showData: false });
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
      apiValue = "details";
    }
    let apiLink = "http://localhost:3000/api/v1/" + apiValue;
    console.log("the api link based on button", apiLink);
    if (this.state.itemCount > 0 && this.state.itemCount !== "") {
      try {
        axios
          .post(apiLink, {
            barcode: barcode,
            count: this.state.itemCount
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
            this.setState({
              itemData: resp.data.data,
              showData: true,
              barcode: ""
            });
            document.getElementById("barcode-id").focus();
          })
          .catch(error => {
            console.log("error", error);
          });
      } catch {
        console.log("error from axios call in comp did mount");
      }
    } else {
      window.alert("count not correct");
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
    this.setState({ addButton: true, deleteButton: false, detailsButton: false, showData: false});
    console.log("add button state", this.state.addButton);
  };

  callDelete = event => {
    event.preventDefault();
    console.log("delete clicked");
    this.setState({ deleteButton: true, addButton: false, detailsButton: false, showData: false });
    console.log("delete button state", this.state.deleteButton);
  };

  callDetails = event => {
    event.preventDefault();
    console.log("details clicked");
    this.setState({ detailsButton: true, addButton: false, deleteButton: false, showData: false });
    console.log("details button state", this.state.detailsButton);
  };

  render() {
    const { barcode } = this.state;
    const isInvalid = barcode === "";
    return (
      <div className="scan-wrapper">

          <h1 className="text-center">Inventory Scanning</h1>

          <div className="scan-form-buttons">
            <button
              className="button scan-add-button"
              name="add-button"
              onClick={this.callAdd}
            >
              Increase Inventory
            </button>

            <button
              className="button scan-delete-button"
              name="delete-button"
              checked="true"
              onClick={this.callDelete}
            >
              Decrease Inventory
            </button>

            <button
              className="button scan-seeDetails-button"
              name="seeDetails-button"
              onClick={this.callDetails}
            >
              Details
            </button>
          </div>

          
          <form className="scan-form" onSubmit={this.onButtonClickHandler}>
            <div className="scan-input-row">
            <input
              name="barcode"
              placeholder=""
              value={barcode}
              onChange={this.handleChange}
              className="scan-input scan-barcode"
              id="barcode-id"
              autoFocus
            />
            <input
              name="itemCount"
              placeholder=""
              value={this.state.itemCount}
              type="number"
              onChange={this.handleChange}
              className="scan-input scan-count"
          
            />
            </div>

<div>
            <button className="button scan-submit-button">Find Barcode</button>
            </div>
          </form>
          <div>
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
