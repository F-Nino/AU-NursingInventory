import React, { Component } from "react";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    /*
      name: props.name,
      items: props.header,*/
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

  /*
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
          console.log(itemIndex);
          console.log(this.state.items);
          console.log(this.state.items[itemIndex]);
          this.props.regetData();
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  };*/

  render() {
    return (
      <div className="section">
        <div
          className="jumbotron-mini text-center"
          onClick={() => this.handleHeaderClick()}
        >
          <span>
            <h2 className="white-header">
              <b>{this.props.name}</b>
            </h2>
          </span>
        </div>
        {this.state.open &&
          (this.props.items != null ? (
            <div className="table_holder">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Last Updated</th>
                    <th>Stock</th>
                    <th>Threshold</th>
                    <th>Buttons</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{this.handleDate(item.updated_at)}</td>
                      <td>{item.count}</td>
                      <td>{item.threshold}</td>
                      <td className="table-buttons">
                        <button
                          className="button delete-button"
                          onClick={() => this.props.onItemDelete(item)}
                        >
                          Delete
                        </button>
                        <button
                          className="button edit-button"
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
          ) : (
            <h2 className="text-center">This Category Is Empty</h2>
          ))}
      </div>
    );
  }
}

export default header;
