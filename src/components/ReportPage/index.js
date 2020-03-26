import React, { Component } from "react";
import Category from "../Category";
import SearchField from "../SearchField";
import EditItemModal from "../EditItemModal";
import { reportDataFetch } from "../../redux/actions/reportPage.js";
import { connect } from "react-redux";
import axios from "axios";

class report extends Component {
  state = {
    showModal: false,
    modalItem: ""
  };

  getCurrentReportPage = () => {
    this.props.reportDataFetch().then(() => {
      console.log(this.props.categoryInfo);
    });
  };

  componentDidMount() {
    this.getCurrentReportPage();
  }

  handleItemDelete = item => {
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
          this.getCurrentReportPage();
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  };

  handleItemEdit = item => {
    this.setState({ showModal: true, modalItem: item });
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("modal-bg").style.display = "block";
    document.body.style.height = "100%";
    document.body.style.overflowY = "hidden";
  };

  closeModal = () => {
    this.setState({ showModal: false });
    document.getElementById("modal-bg").style.display = "none";
    document.body.style.overflowY = "visible";
  };

  render() {
    return (
      <div>
        <h2 className="text-center inventory-title">Inventory Overview</h2>
        {this.state.showModal && (
          <EditItemModal
            pageName={"Edit item"}
            onClose={this.closeModal}
            onPrint={this.printBarcode}
            item={this.state.modalItem}
            onEditUpdate={this.getCurrentReportPage}
          />
        )}
        <SearchField />
        <Category
          onItemEdit={this.handleItemEdit}
          onItemDelete={this.handleItemDelete}
        />
        <div
          className="modal-background"
          id="modal-bg"
          onClick={this.closeModal}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoryInfo: state.reportState.reportData
});

const mapDispatchToProps = dispatch => ({
  reportDataFetch: () => dispatch(reportDataFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(report);
