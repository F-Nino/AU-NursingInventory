import axios from "axios";
import { LOGIN_USER, LOGOUT_USER, ERROR_LOGIN } from "./actionTypes";
import { apiRoute } from "../../constants/routes";

export const userLoginFetch = (username, password) => {
  return (dispatch) => {
    return axios
      .post(apiRoute + "login", {
        id: username,
        password: password,
      })
      .then((resp) => {
        localStorage.setItem("token", resp.data.jwt);
        dispatch(loginUser(resp.data.user));
      })
      .catch((error) => {
        dispatch(errorLogin());
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

const errorLogin = () => ({
  type: ERROR_LOGIN,
});

const loginUser = (userObj) => ({
  type: LOGIN_USER,
  payload: userObj,
});

const logoutUser = () => ({
  type: LOGOUT_USER,
});
