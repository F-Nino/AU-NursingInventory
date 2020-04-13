import axios from "axios";
import { ADD_SCAN, DELETE_SCAN, DETAIL_SCAN } from "./actionTypes";
import { apiRoute } from "../../constants/routes";

export const itemFetch = (barcode) => {
  console.log(barcode);
  return axios
    .post(apiRoute + "scan_in", {
      barcode: barcode,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
