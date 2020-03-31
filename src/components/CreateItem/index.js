import React, { Component } from "react";
import axios from "axios";
import CreateItemForm from "../CreateItemForm";
import CreateItemModal from "../CreateItemModal";
import html2canvas from "html2canvas";
import EditItemModal from "../EditItemModal";

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemDescription: "",
      initialCount: 0,
      itemCost: 0.0,
      itemThreshold: 1,
      errorMessage: [],
      currentCategorySelected: this.props.categories[0],
      showModal: false,
      item: {},
      width: 1
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
    if (this.state.itemName.length < 8) {
      this.setState({ width: 3 });
    } else if (this.state.itemName.length < 15) {
      this.setState({ width: 2 });
    } else {
      this.setState({ width: 1 });
    }
  };

  handleCostChange = value => {
    this.setState({ itemCost: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    var categoryId;
    this.props.categories.forEach(category => {
      if (category.name === this.state.currentCategorySelected) {
        categoryId = category.id;
      }
    });
    var submitItem = true;
    var errorMessage = [];
    if (this.state.itemName === "") {
      submitItem = false;
      errorMessage.push("Item Name Cannot Be Empty");
    }
    if (this.state.itemDescription === "") {
      submitItem = false;
      errorMessage.push("Item Description Cannot Be Empty");
    }
    if (this.state.initialCount < 0) {
      submitItem = false;
      errorMessage.push("Item Count Cannot Be Less Than 0");
    }
    if (this.state.itemThreshold < 0) {
      submitItem = false;
      errorMessage.push("Item Threshold Cannot Be Less Than 0");
    }
    if (this.state.itemCost < 0) {
      submitItem = false;
      errorMessage.push("Item Cost Cannot Be Less Than 0");
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
            category_id: categoryId,
            threshold: this.state.itemThreshold,
            cost: this.state.itemCost
          }
        })
        .then(res => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          document.getElementById("modal-bg").style.display = "block";
          document.body.style.height = "100%";
          document.body.style.overflowY = "hidden";
          let item = {};
          item.name = this.state.itemName;
          item.count = this.state.initialCount;
          item.threshold = this.state.itemThreshold;
          item.cost = this.state.itemCost;
          item.description = this.state.itemDescription;
          item.id = res.data.data.id;
          this.setState({ errorMessage: [], item, showModal: true });
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

  render() {
    return (
      <div>
        {this.state.showModal && (
          <EditItemModal
            pageName={"Item Successfully Created"}
            onPrint={this.printBarcode}
            onEdit={this.editModal}
            onClose={this.closeModal}
            item={this.state.item}
          />
        )}
        <div>
          <h1 className="text-center pt-3">Create Item</h1>

          <CreateItemForm
            onChange={this.handleChange}
            onCostChange={this.handleCostChange}
            onSubmit={this.handleSubmit}
            itemName={this.state.itemName}
            itemDescription={this.state.itemDescription}
            initialCount={this.state.initialCount}
            categories={this.props.categories}
            itemThreshold={this.state.itemThreshold}
            itemCost={this.state.itemCost}
            currentCategorySelected={this.state.currentCategorySelected}
            width={this.state.width}
          />
        </div>

        <div
          className="modal-background"
          id="modal-bg"
          onClick={this.closeModal}
        ></div>

        <div className="error-message">
          {this.state.errorMessage.length > 0 && (
            <ul>
              {this.state.errorMessage.map(message => (
                <li>{message}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default CreateItem;
