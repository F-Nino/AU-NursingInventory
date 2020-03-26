import React from "react";

const ItemData = props => {
  console.log("inside itemData", props.barcode);
  return (
    <div className="item-data-wrapper">
      <h4>Name: {props.name}</h4>
      <h4>Barcode: {props.barcode}</h4>
      <h4>Count: {props.count}</h4>
      <h4>Id: {props.id}</h4>
      <h4>Category: {props.category}</h4>
      <h4>Description: {props.description}</h4>
      <h4>Created: {props.created}</h4>
      <h4>Updated: {props.updated}</h4>
    </div>
  );
};

export default ItemData;
