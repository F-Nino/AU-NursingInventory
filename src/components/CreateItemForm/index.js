import React, { Component } from "react";
import Barcode from "react-barcode";

class CreateItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit} className="create-item-form">
        <div className="rows">
          <div className="name-section">
            <label className="section-title">Name:</label>
            <input
              className="form-control"
              name="itemName"
              type="text"
              value={this.props.itemName}
              onChange={this.props.onChange}
            />
          </div>

          <div className="category-section">
            <label className="section-title">Category:</label>
            <select
              className="form-control"
              name="currentCategorySelected"
              value={this.props.currentCategorySelected}
              onChange={this.props.onChange}
            >
              {this.props.categories.map(category => (
                <option id={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rows">
          <div className="form-numbers">
            <div className="col-6">
              <label className="section-title">Threshold:</label>
              <input
                className="form-control"
                name="itemThreshold"
                type="number"
                value={this.props.itemThreshold}
                onChange={this.props.onChange}
              />
            </div>

            <div className="form-top-padding">
              <label className="section-title">Stock:</label>
              <input
                className="form-control"
                name="initialCount"
                type="number"
                value={this.props.initialCount}
                onChange={this.props.onChange}
              />
            </div>

            <div className="form-top-padding">
              <label className="section-title">Cost:</label>
              <input
                className="form-control"
                name="itemCost"
                type="number"
                value={this.props.itemCost}
                onChange={this.props.onChange}
              />
            </div>
          </div>

          <div className="item-desc-section">
            <label className="section-title">Description:</label>
            <textarea
              className="text-height"
              name="itemDescription"
              type="text"
              rows="3"
              value={this.props.itemDescription}
              onChange={this.props.onChange}
            >
              {this.props.categories.map(category => (
                <option
                  key={category.id}
                  id={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </textarea>
          </div>
        </div>

        <div className="barcode-wrapper">
          {this.props.itemName && (
            <Barcode value={this.props.itemName} width={this.props.width} />
          )}
        </div>

        <div className="button-wrapper">
          <button className="button create-item-button" type="submit">
            Create Item
          </button>
        </div>
      </form>
    );
  }
}

export default CreateItem;
