import React, { Component } from "react";

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      screenSize: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.header) !== JSON.stringify(this.state.items)) {
      this.setState({ items: this.props.header });
    }
  }

  handleHeaderClick = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  handleDate = (lastUpdated) => {
    var modifiedDate = new Date(lastUpdated);
    return modifiedDate.toDateString();
  };

  handleModalClick = (name) => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
    this.props.onCategoryModalClick(name);
  };

  componentDidMount() {
    window.addEventListener("resize", this.reportWindowSize);
    this.setState({ screenSize: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.reportWindowSize);
  }

  reportWindowSize = () => {
    this.setState({ screenSize: window.innerWidth });
  };

  render() {
    return (
      <div className="section">
        <div
          className="jumbotron-mini text-center"
          onClick={() => this.handleHeaderClick()}
        >
          <div className="inventory-report-cat-header">
            <h2 className="white-header">
              <b>{this.props.name}</b>
            </h2>
            <div className="pencil-div">
              <button
                className="button pencil-icon"
                onClick={() => this.handleModalClick(this.props.name)}
              >
                &#9998;
              </button>
            </div>
          </div>
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
                  {this.props.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{this.handleDate(item.updated_at)}</td>
                      <td>{item.count}</td>
                      <td>{item.threshold}</td>
                      <td className="table-buttons">
                        {this.state.screenSize > 1000 && (
                          <button
                            className="button edit-button"
                            onClick={() => this.props.onItemEdit(item)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="button delete-button"
                          onClick={() => this.props.onItemDelete(item)}
                        >
                          Delete
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
