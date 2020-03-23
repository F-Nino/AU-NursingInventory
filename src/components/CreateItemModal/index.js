import React, { Component } from "react";
import Barcode from "react-barcode";

class modal extends Component {
  state = {};
  render() {
    return (
      <div className="modal-form show fade">
        <div className="modal-chunk p-2">
          <h3>Item Successfully Created</h3>
        </div>
        <div className="row pt-3 pl-3">
          <div className="col-md-8">
            <ul>
              <li>
                <label>
                  <b>Name:</b> {this.props.itemName}
                </label>
              </li>
              <li>
                <label>
                  <b>Description:</b> {this.props.itemDescription}
                </label>
              </li>
              <li>
                <label>
                  <b>Count:</b> {this.props.count}
                </label>
              </li>
              <li>
                <label>
                  <b>Category:</b> {this.props.category}
                </label>
              </li>
            </ul>
          </div>
          <div className="col-md-4 text-center align-center">
            <ul>
              <li className="pb-1">
                <button
                  className="btn-custom"
                  onClick={() => this.props.onPrint(this.props.itemName)}
                >
                  Print Barcode
                </button>
              </li>
              <li className="edit-1">
                <button className="btn btn-warning" onClick={this.props.onClose}>
                  Edit
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
          <Barcode value={this.props.itemName} width={3} />
        </div>
      </div>
    );
  }
}

export default modal;
