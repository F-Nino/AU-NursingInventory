import React, { Component } from "react";
import axios from "axios";

class editCategoryModal extends Component {
  state = {
    originalName: this.props.category,
    editedName: this.props.category,
    message: "",
    isDisabledButton: true,
    isCategoryDeleted: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      message: "",
      isDisabledButton: false
    });
  };

  handleDeleteCategory = () => {
    if (
      window.confirm(
        "WARNING: DELETING A CATEGORY WILL COMPLETELY REMOVE\nALL OF THE ITEMS IN THAT CATEGORY FROM THE INVENTORY SYSTEM" +
          "\n\nAre You Sure You Want To Permanently Delete The Category: " +
          this.state.originalName
      )
    ) {
      if (this.state.editedName !== this.state.originalName) {
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
              name: this.state.originalName
            }
          })
          .then(res => {
            this.props.onEditUpdate();
            this.setState({
              message:
                "Successful Deletion Of Category: " + this.state.originalName,
              isCategoryDeleted: true
            });
          })
          .catch(error => {
            console.log("Error: ", error);
          });
      }
    }
  };

  handleUpdateCategory = () => {
    if (this.state.editedName.length > 20) {
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
          old_name: this.state.originalName,
          name: this.state.editedName
        }
      })
      .then(res => {
        console.log(res);
        console.log("what is going on");
        this.props.onEditUpdate();
        this.setState({
          message:
            "Successfully Updated Category Name: " + this.state.editedName,
          originalName: this.state.editedName
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
        <div className="category-modal-parent">
          <div className="modal-category-name">
            <label>
              <b>Name:</b>
            </label>
            <input
              name="editedName"
              type="text"
              className="category-input-name"
              value={this.state.editedName}
              onChange={this.handleChange}
              disabled={this.state.isCategoryDeleted}
            ></input>
          </div>
          {this.state.isCategoryDeleted === false ? (
            <div className="modal-category-buttons">
              <div>
                <button
                  className="button modal-button save"
                  disabled={this.state.isDisabledButton}
                  onClick={() => this.handleUpdateCategory()}
                >
                  Save Changes
                </button>
              </div>

              <div>
                <button
                  className="button modal-button print"
                  onClick={() => this.handleDeleteCategory()}
                >
                  Delete Category
                </button>
              </div>
              <div>
                <button
                  className="button modal-button close"
                  onClick={this.props.onClose}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="modal-category-buttons">
              <div>
                <button
                  className="button modal-button close"
                  onClick={this.props.onClose}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        {this.state.message !== "" && (
          <div className="confirmation-update">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default editCategoryModal;
