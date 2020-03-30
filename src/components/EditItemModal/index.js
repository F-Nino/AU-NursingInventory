import React, { Component } from "react";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import axios from "axios";

class EditItemModal extends Component {
  state = {
    itemName: this.props.item.name,
    itemDescription: this.props.item.description,
    itemCount: this.props.item.count,
    itemCost: this.props.item.cost,
    itemThreshold: this.props.item.threshold,
    message: "",
    width: 1
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, message: "" });
    if (this.state.itemName.length < 8) {
      this.setState({ width: 4 });
    }
    else if (this.state.itemName.length < 15) {
      this.setState({ width: 3 });
    }
    else if (this.state.itemName.length < 25) {
      this.setState({ width: 2 });
    }
    else {
      this.setState({ width: 1 });
    }
  };

  handleUpdateBarcode = () => {
    let message = "";
    let shouldItemUpdate = true;
    if (this.state.itemName === "") {
      shouldItemUpdate = false;
    }
    if (this.state.itemDescription === "") {
      shouldItemUpdate = false;
    }
    if (this.state.itemCount < 0 || this.state.itemCount === "") {
      shouldItemUpdate = false;
    }
    if (this.state.itemThreshold < 0 || this.state.itemThreshold === "") {
      shouldItemUpdate = false;
    }
    if (this.state.itemCost < 0 || this.state.itemCost === "") {
      shouldItemUpdate = false;
    }
    if (shouldItemUpdate) {
      axios
        .patch(`http://localhost:3000/api/v1/update_item`, {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true
          },
          id: this.props.item.id,
          item: {
            name: this.state.itemName,
            description: this.state.itemDescription,
            count: this.state.itemCount,
            cost: this.state.itemCost,
            barcode: this.state.itemName,
            threshold: this.state.itemThreshold
          }
        })
        .then(res => {
          message = "Successfully Updated " + this.state.itemName + "NEED TO FIX Please Reprint Barcode If Name Has Changed";
          try {
            this.props.onEditUpdate();
          } catch {}
          this.setState({ message });
        })
        .catch(error => {
          console.log("error", error);
          message =
            "Item With Name Already Exists, or Data Fields Entered Incorrectly";
          this.setState({ message });
        });
    } else {
      message = "Invalid Data Entry, Please Check Your Inputs";
      this.setState({ message });
    }
  };

  printBarcode = () => {
    let itemName = this.state.itemName;
    html2canvas(document.querySelector("#barcode-save")).then(function(canvas) {
      let fileName = itemName + ".png";
      saveAs(canvas.toDataURL(), fileName);
    });

    function saveAs(uri, fileName) {
      var link = document.createElement("a");
      if (typeof link.download === "string") {
        link.href = uri;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
      }
    }
  };

  render() {
    return (
      <div className="modal-form show fade">
        <div className="header-wrapper">
          <h3>{this.props.pageName}</h3>
        </div>
        <div className="modal-flex-parent">
          <div className="modal-input-wrapper">
            <div className="modal-name">
              <label>
                <b>Name:</b>
              </label>
              <input
                name="itemName"
                type="text"
                value={this.state.itemName}
                onChange={this.handleChange}
              ></input>
            </div>

            <div className="modal-desc">
              <label>
                <b>Description:</b>
              </label>
              <textarea
                name="itemDescription"
                className="no-resize"
                type="text"
                rows="3"
                value={this.state.itemDescription}
                onChange={this.handleChange}
              />
            </div>

            <div className="flex-parent">
              <div className="modal-number-input">
                <label>
                  <b>Count:</b>
                </label>
                <input
                  name="itemCount"
                  type="number"
                  value={this.state.itemCount}
                  onChange={this.handleChange}
                />
              </div>

              <div className="modal-number-input">
                <label>
                  <b>Cost:</b>
                </label>
                <input
                  name="itemCost"
                  type="number"
                  value={this.state.itemCost}
                  onChange={this.handleChange}
                />
              </div>

              <div className="modal-number-input">
                <label>
                  <b>Threshold:</b>
                </label>
                <input
                  name="itemThreshold"
                  type="number"
                  value={this.state.itemThreshold}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button
              className="button modal-button save"
              onClick={() => this.handleUpdateBarcode()}
            >
              Save Changes
            </button>

            <button
              className="button modal-button print"
              onClick={() => this.printBarcode()}
            >
              Print Barcode
            </button>

            <button
              className="button modal-button close"
              onClick={this.props.onClose}
            >
              Close
            </button>
          </div>
        </div>

        <div className="barcode-wrapper" id="barcode-save">
          <Barcode value={this.state.itemName} width={this.state.width} />
        </div>
        {this.state.message !== "" && (
          <div className="confirmation-update">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default EditItemModal;
