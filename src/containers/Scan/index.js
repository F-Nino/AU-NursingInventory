import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: "",
      checked: "add-button",
      showAdd: true,
      showDelete: false,
      showDetails: false,
      showText: false,
      showResponse: []
    };
  }

  onButtonClickHandler = event => {
    event.preventDefault();
    this.setState({ showMessage: true });

    console.log(this.state.barcode);
    return axios
      .post("http://localhost:3000/api/v1/scan_in", {
        barcode: this.state.barcode
      })
      .then(resp => {
        this.setState({ showResponse: resp.data.data });
        this.setState({ showText: true });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  /*
  handleSubmit = event => {
    event.preventDefault();
    const { barcode } = this.state;
    console.log(barcode);
    console.log("Barcode Entered");
  };*/

  callAdd = event => {
    event.preventDefault();
    this.setState({ checked: event.target.name });
    /*
    this.setState({ showDelete: false });
    this.setState({ showDetails: false });
    */
  };
  /*
  callDelete = event => {
    event.preventDefault();
    this.setState({ showAdd: false });
    this.setState({ showDelete: true });
    this.setState({ showDetails: false });
    console.log("Current State: ", this.state);
  };
  callDetails = event => {
    event.preventDefault();
    this.setState({ showAdd: false });
    this.setState({ showDelete: false });
    this.setState({ showDetails: true });
    console.log("Current State: ", this.state);
  };*/

  render() {
    const { barcode } = this.state;
    const isInvalid = barcode === "";
    return (
      <div className="scan-wrapper">
        <form onSubmit={this.onButtonClickHandler}>
          <div className="container">
            <h1 className="text-center">Scan An Item</h1>

            <div classname="form-buttons text-center">
              <button
                className="btn btn-primary add-button text-center"
                name="add-button"
                checked={this.state.checked === "add-button"}
                onClick={this.callAdd}
              >
                Add
              </button>

              <button
                className="btn  btn-primary delete-button text-center"
                name="delete-button"
                checked={this.state.checked === "delete-button"}
                onClick={this.callAdd}
              >
                Delete
              </button>

              <button
                className="btn btn-primary details-button text-center"
                name="seeDetails-button"
                checked={this.state.checked === "seeDetails-button"}
                onClick={this.callAdd}
              >
                Details
              </button>
            </div>
          </div>

          <input
            name="barcode"
            placeholder="barcode_placeholder"
            value={barcode}
            onChange={this.handleChange}
            className="scan-input"
          />

          <button className="scan-submit-button">Find Barcode</button>
        </form>
        {this.state.showText ? (
          <ul>
            <li>
              <b>Name: </b> {this.state.showResponse.name}
            </li>
            <li>
              <b>Count: </b>
              {this.state.showResponse.count}
            </li>
            <li>
              <b>ID:</b>
              {this.state.showResponse.id}
            </li>
            <li>
              <b>barcode: </b>
              {this.state.showResponse.barcode}
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Scan;

//class App extends Component{
//  onButtonClickHandler = () => {
//   this.setState({showMessage: true});
//  };
//
//  render(){
//    return(<div className="App">
//     {this.state.showMessage && <p>Hi</p>}
//      <button onClick={this.onButtonClickHandler}>Enter</button>
//    </div>);
//
//  }
//}

// Scan container page
