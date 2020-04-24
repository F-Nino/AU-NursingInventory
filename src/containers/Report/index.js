import React, { Component } from "react";
import Category from "../../components/Category";
import SearchField from "../../components/SearchField";
import EditItemModal from "../../components/EditItemModal";
import EditCategoryModal from "../../components/EditCategoryModal";
import { reportDataFetch } from "../../redux/actions/reportPage.js";
import { connect } from "react-redux";
import axios from "axios";
import { CSVLink } from "react-csv";
import { apiRoute } from "../../constants/routes";

class Report extends Component {
  state = {
    showItemModal: false,
    showCategoryModal: false,
    modalItem: "",
    modalCategory: "",
    headers: [],
    data: [],
  };

  componentDidMount() {
    this.props.reportDataFetch();
    this.getInventoryData();
  }

  getInventoryData() {
    axios
      .get(apiRoute + "get_all_items")
      .then((resp) => {
        this.setState({ data: resp.data.data }, () => this.fixdata());
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  fixdata = () => {
    let sortData = this.state.data;
    let newData = [];
    sortData.map((value) => {
      delete value.created_at;
      delete value.updated_at;
      delete value.category_id;
      newData.push(value);
    });
    this.setState({ data: newData });
  };

  handleItemDelete = (item) => {
    if (window.confirm("Confirm Deletion of " + item.name)) {
      axios
        .delete(apiRoute + "delete_item", {
          headers: {
            "Access-Control-Allow-Origin": true,
            crossorigin: true,
          },
          data: {
            id: item.id,
          },
        })
        .then((res) => {
          this.getCurrentReportPage();
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  handleItemEdit = (item) => {
    this.setState({ showItemModal: true, modalItem: item });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("modal-bg").style.display = "block";
    document.body.style.height = "100%";
    document.body.style.overflowY = "hidden";
  };

  closeModal = () => {
    this.setState({ showItemModal: false, showCategoryModal: false });
    document.getElementById("modal-bg").style.display = "none";
    document.body.style.overflowY = "visible";
  };

  popUpCategoryModal = (category) => {
    this.setState({ showCategoryModal: true, modalCategory: category });
    document.getElementById("modal-bg").style.display = "block";
    document.body.style.height = "100%";
    document.body.style.overflowY = "hidden";
  };

  grabFileName = () => {
    let date = new Date();

    let finalDate =
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "_inventory_report.csv";
    return finalDate;
  };

  render() {
    return (
      <div className="page-wrapper">
        <h2 className="text-center inventory-title">Inventory Overview</h2>
        {this.state.showItemModal && (
          <EditItemModal
            pageName={"Edit item"}
            onClose={this.closeModal}
            onPrint={this.printBarcode}
            item={this.state.modalItem}
            onEditUpdate={this.props.reportDataFetch}
          />
        )}
        {this.state.showCategoryModal && (
          <EditCategoryModal
            onClose={this.closeModal}
            category={this.state.modalCategory}
            onEditUpdate={this.props.reportDataFetch}
          />
        )}
        <SearchField />
        <Category
          onItemEdit={this.handleItemEdit}
          onItemDelete={this.handleItemDelete}
          categoryInfo={this.props.categoryInfo}
          onCategoryModalClick={this.popUpCategoryModal}
        />
        <div
          className="modal-background"
          id="modal-bg"
          onClick={this.closeModal}
        ></div>
        <div className="csv-box">
          <CSVLink data={this.state.data} filename={this.grabFileName()}>
            Download Inventory Report
          </CSVLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoryInfo: state.reportState.reportData,
});

const mapDispatchToProps = (dispatch) => ({
  reportDataFetch: () => dispatch(reportDataFetch()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Report);
