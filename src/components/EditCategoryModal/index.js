import React, { Component } from "react";
import axios from "axios";

class editCategoryModal extends Component {
  state = {
    category: this.props.category,
    message: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, message: "" });
  };

  handleDeleteCategory = () => {
    if (window.confirm("Confirm Deletion of " + this.state.category)) {
      axios
        .delete(`http://localhost:3000/api/v1/delete_category`, {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true
          },
          data: {
            name: this.state.category
          }
        })
        .then(res => {
          this.props.onEditUpdate();
          console.log("she worked");
          this.setState({
            message: "Succesfull deletion of " + this.state.category
          });
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  };

  handleUpdateCategory = () => {
    if (this.state.category.length > 20) {
      this.setState({
        message: "Error: Category Length cannot be greater than 20"
      });
    }
    axios
      .patch(`http://localhost:3000/api/v1/update_category`, {
        headers: {
          "Access-Control-Allow-Origin": true,
          crossorigin: true
        },
        category: {
          old_name: this.props.category,
          name: this.state.category
        }
      })
      .then(res => {
        this.props.onEditUpdate();
        this.setState({
          message: "Successfully updated " + this.state.category
        });
      })
      .catch(error => {
        this.setState({ message: "Error: invalid name" });
      });
  };

  render() {
    return (
      <div className="modal-form show fade">
        <div className="header-wrapper">
          <h3>Edit Category</h3>
        </div>
        <div className="modal-flex-parent">
          <div className="modal-input-wrapper">
            <div className="modal-name">
              <label>
                <b>Name:</b>
              </label>
              <input
                name="category"
                type="text"
                value={this.state.category}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <div className="modal-buttons">
            <button
              className="button modal-button save"
              onClick={() => this.handleUpdateCategory()}
            >
              Save Changes
            </button>

            <button
              className="button modal-button print"
              onClick={() => this.handleDeleteCategory()}
            >
              Delete Category
            </button>

            <button
              className="button modal-button close"
              onClick={this.props.onClose}
            >
              Close
            </button>
          </div>
        </div>
        {this.state.message !== "" && (
          <div className="confirmation-update">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default editCategoryModal;
