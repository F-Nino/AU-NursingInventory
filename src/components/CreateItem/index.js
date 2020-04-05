import React, { Component } from "react";
import axios from "axios";
import Barcode from "react-barcode";
import NumericInput from "react-numeric-input";
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
      errorAsterik: [],
      currentCategorySelected: this.props.categories[0],
      showModal: false,
      item: {},
      width: 1,
    };
  }

  printBarcode = (itemName) => {
    html2canvas(document.querySelector("#barcode-save")).then(function (
      canvas
    ) {
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.itemName.length < 8) {
      this.setState({ width: 3 });
    } else if (this.state.itemName.length < 15) {
      this.setState({ width: 2 });
    } else {
      this.setState({ width: 1 });
    }
  };

  handleCostChange = (value) => {
    this.setState({ itemCost: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var categoryId;
    this.props.categories.forEach((category) => {
      if (category.name === this.state.currentCategorySelected) {
        categoryId = category.id;
      }
    });
    var submitItem = true;
    var errorMessage = [];
    let errorAsterik = [];
    if (this.state.itemName === "") {
      submitItem = false;
      errorMessage.push("Item Name Cannot Be Empty");
      errorAsterik.push("itemName");
    }
    if (this.state.itemDescription === "") {
      submitItem = false;
      errorMessage.push("Item Description Cannot Be Empty");
      errorAsterik.push("itemDescription");
    }
    if (this.state.initialCount < 0) {
      submitItem = false;
      errorMessage.push("Item Count Cannot Be Less Than 0");
      errorAsterik.push("initialCount");
    }
    if (this.state.itemThreshold < 0) {
      submitItem = false;
      errorMessage.push("Item Threshold Cannot Be Less Than 0");
      errorAsterik.push("itemThreshold");
    }
    if (this.state.itemCost < 0) {
      submitItem = false;
      errorMessage.push("Item Cost Cannot Be Less Than 0");
      errorAsterik.push("itemCost");
    }
    if (submitItem) {
      axios
        .post(`http://localhost:3000/api/v1/items`, {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true,
          },
          item: {
            name: this.state.itemName,
            description: this.state.itemDescription,
            count: this.state.initialCount,
            barcode: this.state.itemName,
            category_id: categoryId,
            threshold: this.state.itemThreshold,
            cost: this.state.itemCost,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.staus === "Failed") {
            console.log(res.data.data);
          } else {
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
          }
        })
        .catch((error) => {
          console.log("error", error);
          errorMessage.push("Name already taken");
          this.setState({ errorMessage });
        });
    } else {
      this.setState({ errorMessage, errorAsterik });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      console.log("testing");
      this.setState({ currentCategorySelected: this.props.categories[0] });
    }
  }

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
            width={this.state.width}
          />
        )}
        <div>
          <h1 className="text-center-create-item pt-3">Create Item</h1>
          <form onSubmit={this.handleSubmit} className="create-item-form">
            <div className="rows">
              <div className="name-section">
                <label className="section-title">
                  Name:
                  {this.state.errorAsterik.includes("itemName") && (
                    <span className="error-asterik">*</span>
                  )}
                </label>
                <input
                  className="form-control"
                  name="itemName"
                  type="text"
                  value={this.state.itemName}
                  onChange={this.handleChange}
                />
              </div>

              <div className="category-section">
                <label className="section-title">Category:</label>
                <select
                  className="form-control"
                  name="currentCategorySelected"
                  value={this.state.currentCategorySelected}
                  onChange={this.handleChange}
                >
                  {this.props.categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rows">
              <div className="form-numbers">
                <div className="form-top-padding">
                  <label className="section-title">
                    Threshold:
                    {this.state.errorAsterik.includes("itemThreshold") && (
                      <span className="error-asterik">*</span>
                    )}
                  </label>
                  <input
                    className="form-control"
                    name="itemThreshold"
                    type="number"
                    value={this.state.itemThreshold}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-top-padding">
                  <label className="section-title">
                    Stock:
                    {this.state.errorAsterik.includes("initialCount") && (
                      <span className="error-asterik">*</span>
                    )}
                  </label>
                  <input
                    className="form-control"
                    name="initialCount"
                    type="number"
                    value={this.state.initialCount}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-top-padding">
                  <label className="section-title">
                    Cost:
                    {this.state.errorAsterik.includes("itemCost") && (
                      <span className="error-asterik">*</span>
                    )}
                  </label>
                  <NumericInput
                    className="form-control"
                    name="itemCost"
                    value={this.state.itemCost}
                    onChange={this.handleCostChange}
                    step={0.01}
                    precision={2}
                    min={0.0}
                  />
                </div>
              </div>

              <div className="item-desc-section">
                <label className="section-title">
                  Description:
                  {this.state.errorAsterik.includes("itemDescription") && (
                    <span className="error-asterik">*</span>
                  )}
                </label>
                <textarea
                  className="text-height"
                  name="itemDescription"
                  type="text"
                  rows="3"
                  value={this.state.itemDescription}
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>

            <div className="barcode-wrapper">
              {this.state.itemName && (
                <Barcode value={this.state.itemName} width={this.state.width} />
              )}
            </div>

            <div className="button-wrapper">
              <button className="button create-item-button" type="submit">
                Create Item
              </button>
            </div>
          </form>
        </div>

        <div
          className="modal-background"
          id="modal-bg"
          onClick={this.closeModal}
        ></div>

        <div className="error-message">
          {this.state.errorMessage.length > 0 && (
            <ul>
              {this.state.errorMessage.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default CreateItem;
