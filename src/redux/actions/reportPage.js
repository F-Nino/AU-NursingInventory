import axios from "axios";
import { SAVE_REPORT_DATA } from "./actionTypes";
import { apiRoute } from "../../constants/routes";

export const reportDataFetch = () => {
  return (dispatch) => {
    return axios
      .get(apiRoute + "report_page", {
        headers: { "Access-Control-Allow-Origin": true, crossorigin: true },
      })
      .then((res) => {
        dispatch(loginUser(res.data.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

const loginUser = (reportObj) => ({
  type: SAVE_REPORT_DATA,
  payload: reportObj,
});
