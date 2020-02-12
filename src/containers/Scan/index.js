import React, { Component } from "react";
import axios from "axios";

class Scan extends Component {

  constructor(props) {
    super(props);

    this.state = {
      barcode: "",
      showAdd: true,
      showDelete: false,
      showDetails: false,
      showText: false
    };
  }

  onButtonClickHandler = () => {
    this.setState({showMessage: true});

    console.log(this.state.barcode);
    return axios
      .post("http://localhost:3000/api/v1/scan_in", {
        barcode: this.state.barcode
      })
      .then(resp => {
        console.log(resp)
      })
      .catch(error => {
        console.log("error", error);
      })
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  handleSubmit = event => {
    const { barcode } = this.state;
    event.preventDefault();
    console.log(barcode);
    console.log("Barcode Entered");
  };

  callAdd = event => {
    event.preventDefault();
    this.setState({showAdd: true});
    this.setState({showDelete: false});
    this.setState({showDetails: false});
    console.log("Current State: ", this.state);
  };
  callDelete = event => {
    event.preventDefault();
    this.setState({showAdd: false});
    this.setState({showDelete: true});
    this.setState({showDetails: false});
    console.log("Current State: ", this.state);
  };
  callDetails = event => {
    event.preventDefault();
    this.setState({showAdd: false});
    this.setState({showDelete: false});
    this.setState({showDetails: true});
    console.log("Current State: ", this.state);
  };


  render() {
    const { error, barcode } = this.state;
    const isInvalid = barcode === "";
    return (
      <div className="scan-wrapper">
        <form onSubmit={this.handleSubmit}>
          <div className="scan-container">
            <h1>Scan An Item</h1>

            <button
              className="button add-button"
              type="add"
              onClick={this.callAdd}
            >
              Add
            </button>

            <button
              className="button delete-button"
              type="delete"
              onClick={this.callDelete}
            >
              Delete
            </button>

            <button
              className="button details-button"
              type="details"
              onClick={this.callDetails}
            >
              Details
            </button>


          </div>

          <input
            name="barcode"
            placeholder="barcode_placeholder"
            value={barcode}
            onChange={this.handleChange}
            className="scan-input"
          />

          <div>
            {this.state.showMessage && <p>Hi</p>}
          </div>



          <button
            className="scan-submit-button"
            onClick={this.onButtonClickHandler}
          >
            Find Barcode
          </button>
        </form>
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
