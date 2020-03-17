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
       
          <div className="name-section">
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

          <div className="category-section">
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

          
          <div className="intial-count-section">
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

          <div className="item-desc-section">
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
<<<<<<< HEAD
            />
=======
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
            </select>
>>>>>>> 0ba47ce09900500900f14649957f3e8ac6c1e743
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
        
            {this.props.itemName && (
              <Barcode value={this.props.itemName} width={1} />
            )}
 
        </div>

        <div className="row">
          
            <button className="button ts-button" type="submit">
              Create Item
            </button>
       
        </div>
      </form>
    
    );
  }
}

export default CreateItem;
