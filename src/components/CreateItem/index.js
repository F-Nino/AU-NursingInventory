import React, { Component } from "react";
import axios from "axios";
import CreateItemForm from "../CreateItemForm";
import CreateItemModal from "../CreateItemModal";
import html2canvas from "html2canvas";

class CreateBarcode extends Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      itemDescription: "",
      initialCount: 0,
      categories: [],
      errorMessage: [],
      currentCategorySelected: "",
      showModal: false
    };
  }

  printBarcode = itemName => {
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

  editModal = () => {
    this.setState({ showModal: true });
    document.getElementById("modal-bg").style.display = "none";
    document.body.style.overflowY = "visible";
    let itemName = this.state.itemName;
    let itemDescription = this.state.itemDescription;
    itemName = "";
    itemDescription = "";
    this.setState({ itemName, itemDescription });
  };

  closeModal = () => {
    this.setState({ showModal: false });
    document.getElementById("modal-bg").style.display = "none";
    document.body.style.overflowY = "visible";
    let itemName = this.state.itemName;
    let itemDescription = this.state.itemDescription;
    itemName = "";
    itemDescription = "";
    this.setState({ itemName, itemDescription });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    var categoryId;
    this.state.categories.forEach(category => {
      if (category.name === this.state.currentCategorySelected) {
        categoryId = category.id;
      }
    });
    var submitItem = true;
    var errorMessage = [];
    if (this.state.itemName === "") {
      submitItem = false;
      errorMessage.push("item name cannot be empty");
    }
    if (this.state.itemDescription === "") {
      submitItem = false;
      errorMessage.push("item description cannot be empty");
    }
    if (this.state.initialCount < 0) {
      submitItem = false;
      errorMessage.push("item count cannot be less than 0");
    }
    if (submitItem) {
      axios
        .post(`http://localhost:3000/api/v1/items`, {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true
          },
          item: {
            name: this.state.itemName,
            description: this.state.itemDescription,
            count: this.state.initialCount,
            barcode: this.state.itemName,
            category_id: categoryId
          }
        })
        .then(res => {
          this.setState({ errorMessage: [] });
          window.scrollTo({ top: 0, behavior: "smooth" });
          this.setState({ showModal: true });
          document.getElementById("modal-bg").style.display = "block";
          document.body.style.height = "100%";
          document.body.style.overflowY = "hidden";
        })
        .catch(error => {
          console.log("error", error);
          errorMessage.push("Name already taken");
          this.setState({ errorMessage });
        });
    } else {
      this.setState({ errorMessage });
    }
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/api/v1/categories`, {
        headers: {
          "Access-Control-Allow-Origin": true,
          crossorigin: true
        }
      })
      .then(res => {
        console.log(res.data.data);
        try {
          this.setState({ categories: res.data.data });
          this.setState({
            currentCategorySelected: this.state.categories[0].name
          });
        } catch {
          console.log("uh oh");
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.showModal && (
          <CreateItemModal
            onPrint={this.printBarcode}
            onEdit={this.editModal}
            onClose={this.closeModal}
            itemName={this.state.itemName}
            itemDescription={this.state.itemDescription}
            count={this.state.initialCount}
            category={this.state.currentCategorySelected}
          />
        )}
        <div>
          <h1 className="text-center pt-3">
            <u>Create Item</u>
          </h1>

          <div className="error-message text-center">
            {this.state.errorMessage.length > 0 && (
              <ul>
                {this.state.errorMessage.map(message => (
                  <li>{message}</li>
                ))}
              </ul>
            )}
          </div>

          <CreateItemForm
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            itemName={this.state.itemName}
            itemDescription={this.state.itemDescription}
            initialCount={this.state.initialCount}
            categories={this.state.categories}
            currentCategorySelected={this.state.currentCategorySelected}
          />
        </div>

        <div
          className="modal-background"
          id="modal-bg"
          onClick={this.closeModal}
        ></div>
      </div>
    );
  }
}

export default CreateBarcode;
