import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiRoute } from "../../constants/routes";

export const userLoginFetch = (username, password) => {
  return (dispatch) => {
    return axios
      .post(apiRoute + "login", {
        id: username,
        password: password,
      })
      .then((resp) => {
        console.log("res", resp.data.jwt);
        console.log("this is also about to set shit");

        localStorage.setItem("token", resp.data.jwt);
        dispatch(loginUser(resp.data.user));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

export const userLogOut = () => {
  return (dispatch) => {
    console.log("loggingOut called");
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };
};

const loginUser = (userObj) => ({
  type: LOGIN_USER,
  payload: userObj,
});

const logoutUser = () => ({
  type: LOGOUT_USER,
});
