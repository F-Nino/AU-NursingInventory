import React, { Component } from "react";
import Barcode from "react-barcode";

class CreateItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row py-3">
          <div className="col-6">
            <label>
              <h3>Name:</h3>
            </label>
            <input
              className="form-control"
              name="itemName"
              type="text"
              value={this.props.itemName}
              onChange={this.props.onChange}
            />
          </div>

          <div className="col-6">
            <label>
              <h3>Item Desciption:</h3>
            </label>
            <textarea
              className="form-control"
              name="itemDescription"
              type="text"
              rows="3"
              value={this.props.itemDescription}
              onChange={this.props.onChange}
            />
          </div>
        </div>
        <div className="row py-3">
          <div className="col-6">
            <label>
              <h3>Intial Count:</h3>
            </label>
            <input
              className="form-control"
              name="initialCount"
              type="number"
              value={this.props.initialCount}
              onChange={this.props.onChange}
            />
          </div>

          <div className="col-6">
            <label>
              <h3>Category:</h3>
            </label>
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

        <div className="row py-3">
          <div className="col-6">
            <label>
              <h3>Item Threshold:</h3>
            </label>
            <input
              className="form-control"
              name="itemThreshold"
              type="number"
              value={this.props.itemThreshold}
              onChange={this.props.onChange}
            />
          </div>

          <div className="col-6">
            <label>
              <h3>Item Cost:</h3>
            </label>
            <input
              className="form-control"
              name="itemCost"
              type="number"
              value={this.props.itemCost}
              onChange={this.props.onChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            {this.props.itemName && (
              <Barcode value={this.props.itemName} width={1} />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <button className="button ts-button" type="submit">
              Create Item
            </button>
          </div>
          <div className="col-4"></div>
        </div>
      </form>
    );
  }
}

export default CreateItem;
