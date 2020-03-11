import React, { Component } from "react";
import Category from "../Category";
import SearchField from "../SearchField";
import EditItemModal from "../EditItemModal";
import { reportDataFetch } from "../../redux/actions/reportPage.js";
import { connect } from "react-redux";

class report extends Component {
  state = {
    showModal: false,
    modalItem: ""
  };

  componentDidMount() {
    this.props.reportDataFetch().then(() => {
      console.log(this.props.categoryInfo);
    });
  }

  regetDatalol = () => {
    this.props.reportDataFetch().then(() => {
      console.log(this.props.categoryInfo);
    });
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
        <h2 className="text-center p-4">Inventory Overview</h2>
        {this.state.showModal && (
          <EditItemModal
            onClose={this.closeModal}
            onPrint={this.printBarcode}
            item={this.state.modalItem}
          />
        )}
        <SearchField />
        <Category
          onItemEdit={this.handleItemEdit}
          regetData={this.regetDatalol}
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
