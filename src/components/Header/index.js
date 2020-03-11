import React, { Component } from "react";
import axios from "axios";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      items: props.header,
      open: false
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.header) !== JSON.stringify(this.state.items)) {
      this.setState({ items: this.props.header });
    }
  }

  handleHeaderClick = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  handleDate = lastUpdated => {
    var modifiedDate = new Date(lastUpdated);
    return modifiedDate.toDateString();
  };

  handleItemDelete = (item, itemIndex) => {
    if (window.confirm("Confirm Deletion of " + item.name)) {
      axios
        .delete(`http://localhost:3000/api/v1/delete_item`, {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true
          },
          data: {
            id: item.id
          }
        })
        .then(res => {
          console.log(res);
          let items = this.state.items;
          items.splice(itemIndex, 1);
          this.setState({ items });
        })
        .catch(error => {
          console.log("error", error);
        });
      /*
      let items = this.state.items;
      items.splice(itemIndex, 1);
      this.setState({ items });*/
      //this.props.regetData();
    }
  };

  render() {
    return (
      <div className="section">
        <div
          className="jumbotron-mini text-center"
          onClick={() => this.handleHeaderClick()}
        >
          <span>
            <h2>
              <b>{this.state.name}</b>
            </h2>
          </span>
        </div>
        {this.state.open && this.state.items != null && (
          <div className="table_holder">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Last Updated</th>
                  <th>Count</th>
                  <th>Buttons</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{this.handleDate(item.updated_at)}</td>
                    <td>{item.count}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleItemDelete(item, index)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.props.onItemEdit(item)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default header;
