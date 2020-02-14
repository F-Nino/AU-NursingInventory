import React, { Component } from "react";
import axios from "axios";

import ItemData from "../../components/ItemData";

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
      itemData: null
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
      apiValue = "delete api endpoint";
    }

    if (detailsButton) {
      apiValue = "details api endpoint";
    }
    let apiLink = "http://localhost:3000/api/v1/" + apiValue;
    console.log("the api link based on button", apiLink);
    try {
      axios
        .post(apiLink, {
          barcode: barcode
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
          console.log("the resp", resp.data.data);
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

  // callDelete = event => {
  //   event.preventDefault();
  //   console.log("delete clicked");
  //   this.setState({ deleteButton: true }, () => {
  //     console.log(this.state.deleteButton);
  //   });
  // };

  // callDetails = event => {
  //   event.preventDefault();
  //   console.log("details clicked");
  //   this.setState({ detailsButton: !this.state.detailsButton });
  //   console.log("details button state", this.state.detailsButton);
  // };

  render() {
    const { barcode } = this.state;
    const isInvalid = barcode === "";
    return (
      <div className="scan-wrapper">
        <div className="container">
          <h1 className="text-center">Scan An Item</h1>

          <div className="scan-form-buttons">
            <button className="button scan-add-button" name="add-button" onClick={this.callAdd}>
              Add
            </button>

            <button
              className="button scan-delete-button"
              name="delete-button"
              checked="true"
              onClick={this.callDelete}
            >
              Delete
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
            <input
              name="barcode"
              placeholder=""
              value={barcode}
              onChange={this.handleChange}
              className="input scan-input"
            />

            <button className="button scan-submit-button">Find Barcode</button>
          </form>
          {this.state.showData ? (
            <ItemData
              barcode={this.state.itemData.barcode}
              category={this.state.itemData.category_id}
              count={this.state.itemData.count}
              created={this.state.itemData.created_at}
              description={this.state.itemData.description}
              id={this.state.itemData.id}
              name={this.state.itemData.name}
              updated={this.state.itemData.updated_at}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Scan;
