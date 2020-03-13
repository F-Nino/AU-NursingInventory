import React, { Component } from "react";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import axios from "axios";

class EditItemModal extends Component {
  state = {
    itemName: this.props.item.name,
    itemDescription: this.props.item.description,
    itemCount: this.props.item.count
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSaveBarcode = () => {
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
          count: this.state.itemCount
        }
      })
      .then(res => {
        alert("Succesfully updated");
        this.props.onEditUpdate();
      })
      .catch(error => {
        console.log("error", error);
        alert(
          "Item with name already exists or data fields entered incorrectly"
        );
      });
  };

  printBarcode = () => {
    let itemName = this.state.itemName;
    console.log(itemName);
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
        window.open(uri);
      }
    }
  };

  render() {
    return (
      <div className="modal-form show fade">
        <div className="modal-chunk p-2">
          <h3>Edit Item</h3>
        </div>
        <div className="row pt-3 pl-3">
          <div className="col-md-8">
            <ul>
              <li>
                <label>
                  <b>Name:</b>
                </label>
                <input
                  name="itemName"
                  type="text"
                  value={this.state.itemName}
                  onChange={this.handleChange}
                ></input>
              </li>
              <li>
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
              </li>
              <li>
                <label>
                  <b>Count:</b>
                </label>
                <input
                  name="itemCount"
                  type="number"
                  value={this.state.itemCount}
                  onChange={this.handleChange}
                />
              </li>
            </ul>
          </div>
          <div className="col-md-4 text-center align-center">
            <ul>
              <li className="pb-1">
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleSaveBarcode()}
                >
                  Save Changes
                </button>
              </li>
              <li className="py-1">
                <button
                  className="btn-custom"
                  onClick={() => this.printBarcode()}
                >
                  Print Barcode
                </button>
              </li>
              <li className="pt-1">
                <button className="btn btn-danger" onClick={this.props.onClose}>
                  Close
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="modal-buttons text-center" id="barcode-save">
          <Barcode value={this.state.itemName} width={1} />
        </div>
      </div>
    );
  }
}

export default EditItemModal;
