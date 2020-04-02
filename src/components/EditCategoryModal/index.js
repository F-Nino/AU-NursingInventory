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
    if (
      window.confirm(
        "WARNING: DELETING A CATEGORY WILL COMPLETELY REMOVE\nALL OF THE ITEMS IN THAT CATEGORY FROM THE INVENTORY SYSTEM" +
          "\n\nAre You Sure You Want To Permanently Delete The Category: " +
          this.props.category
      )
    ) {
      if (this.state.category !== this.props.category) {
        window.alert(
          "ERROR: The Category You Are Trying To Delete\nDoes Not Match The Input Field"
        );
      } else {
        axios
          .delete(`http://localhost:3000/api/v1/delete_category`, {
            headers: {
              "Access-Control-Allow-Origin": true,
              crossorigin: true
            },
            data: {
              name: this.props.category
            }
          })
          .then(res => {
            this.props.onEditUpdate();
            this.setState({
              message: "Successful Deletion Of Category: " + this.state.category
            });
          })
          .catch(error => {
            console.log("Error: ", error);
          });
      }
    }
  };

  handleUpdateCategory = () => {
    if (this.state.category.length > 20) {
      this.setState({
        message: "Error: Category Length Cannot Be Greater Than 20"
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
          message: "Successfully Updated Category Name: " + this.state.category
        });
      })
      .catch(error => {
        this.setState({ message: "Error: Invalid Name" });
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