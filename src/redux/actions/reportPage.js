import axios from "axios";
import { SAVE_REPORT_DATA } from "./actionTypes";

export const reportDataFetch = () => {
  return dispatch => {
    return axios
      .get("http://localhost:3000/api/v1/report_page", {
        headers: { "Access-Control-Allow-Origin": true, crossorigin: true }
      })
      .then(res => {
        dispatch(loginUser(res.data.data));
      })
      .catch(error => {
        console.log("error", error);
      });
  };
};

const loginUser = reportObj => ({
  type: SAVE_REPORT_DATA,
  payload: reportObj
});
