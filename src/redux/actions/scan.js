import axios from "axios";
import { ADD_SCAN, DELETE_SCAN, DETAIL_SCAN } from "./actionTypes";

export const itemFetch = (barcode) => {
  console.log(barcode);
  return axios
    .post("http://localhost:3000/api/v1/scan_in", {
      barcode: barcode
    })
    .then(resp => {
      console.log(resp)
    })
    .catch(error => {
      console.log("error", error);
    })
};
