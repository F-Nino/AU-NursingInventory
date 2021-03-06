import React, { Component } from "react";
import axios from "axios";
import { apiRoute } from "../../constants/routes";

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
      itemCount: 1,
      showCount: true,
    };
  }

  onButtonClickHandler = (event) => {
    event.preventDefault();
    const { barcode, addButton, deleteButton, detailsButton } = this.state;
    this.setState({ showData: false });
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
    let apiLink = apiRoute + apiValue;
    if (
      this.state.itemCount > 0 &&
      this.state.itemCount !== "" &&
      barcode !== ""
    ) {
      try {
        axios
          .post(apiLink, {
            barcode: barcode,
            count: this.state.itemCount,
          })
          .then((resp) => {
            console.log(resp);
            if (resp == null) {
              console.log("null data resp");
            }
            if (resp.data.status == "ERROR") {
              console.log("Error: Item Not In Database");
              window.alert("Error: Item Not In Database");
              this.setState({
                barcode: "",
              });
              document.getElementById("barcode-id").focus();
            } else {
              this.setState({
                itemData: resp.data.data,
                showData: true,
                barcode: "",
              });
            }
            //if resp.data.status == SUCCESS
            console.log("the resp", resp);
            document.getElementById("barcode-id").focus();
          })
          .catch((error) => {
            console.log("error", error);
            window.alert("Error: Decrease Exceeds Stock Count");
          });
      } catch {
        console.log("error from axios call in comp did mount");
      }
    } else {
      window.alert("Error: Invalid Fields (Barcode And/Or Count)");
      this.setState({
        barcode: "",
        itemCount: 1,
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  callAdd = (event) => {
    event.preventDefault();
    console.log("add clicked");
    this.setState(
      {
        addButton: true,
        deleteButton: false,
        detailsButton: false,
        showData: false,
        showCount: true,
      },
      () => {
        console.log("add button state", this.state.addButton);
      }
    );
  };

  callDelete = (event) => {
    event.preventDefault();
    console.log("delete clicked");
    this.setState(
      {
        deleteButton: true,
        addButton: false,
        detailsButton: false,
        showData: false,
        showCount: true,
      },
      () => {
        console.log("add button state", this.state.deleteButton);
      }
    );
  };

  callDetails = (event) => {
    event.preventDefault();
    console.log("details clicked");
    this.setState(
      {
        detailsButton: true,
        addButton: false,
        deleteButton: false,
        showData: false,
        showCount: false,
        itemCount: 1,
      },
      () => {
        console.log("add button state", this.state.detailsButton);
      }
    );
  };

  getLabelClassName = (value) => {
    let classNameForButton = "scan-button button ";
    if (value === "add-button" && this.state.addButton) {
      classNameForButton += "active-scan-button";
    } else if (value === "delete-button" && this.state.deleteButton) {
      classNameForButton += "active-scan-button";
    } else if (value === "seeDetails-button" && this.state.detailsButton) {
      classNameForButton += "active-scan-button";
    }
    return classNameForButton;
  };

  render() {
    const { barcode } = this.state;
    return (
      <div className="scan-wrapper">
        <h1 className="text-center scan-title">Inventory Scanning</h1>

        <div className="scan-form-buttons">
          <button
            className={this.getLabelClassName("add-button")}
            name="add-button"
            onClick={this.callAdd}
          >
            Increase Inventory
          </button>

          <button
            className={this.getLabelClassName("delete-button")}
            name="delete-button"
            onClick={this.callDelete}
          >
            Decrease Inventory
          </button>

          <button
            className={this.getLabelClassName("seeDetails-button")}
            name="seeDetails-button"
            onClick={this.callDetails}
          >
            Item Details
          </button>
        </div>

        <form className="scan-form" onSubmit={this.onButtonClickHandler}>
          <div className="scan-input-row">
            <input
              name="barcode"
              placeholder="Barcode"
              value={barcode}
              onChange={this.handleChange}
              className="scan-input scan-barcode"
              id="barcode-id"
              autoFocus
            />
            {this.state.showCount && (
              <input
                name="itemCount"
                placeholder=""
                value={this.state.itemCount}
                type="number"
                onChange={this.handleChange}
                className="scan-input scan-count"
              />
            )}
          </div>

          <div>
            <button className="button scan-submit-button">Scan Barcode</button>
          </div>
        </form>
        <div>
          {this.state.showData ? (
            <table className="scan-table">
              <thead>
                <tr>
                  <th>Barcode ID:</th>
                  <td>{this.state.itemData.name}</td>
                </tr>
                <tr>
                  <th>In Stock:</th>
                  <td>{this.state.itemData.count}</td>
                </tr>
                <tr>
                  <th>Threshold:</th>
                  <td>{this.state.itemData.threshold}</td>
                </tr>
                <tr>
                  <th>Description:</th>
                  <td>{this.state.itemData.description}</td>
                </tr>
              </thead>
            </table>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Scan;
