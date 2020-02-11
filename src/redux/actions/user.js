import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";

export const userLoginFetch = (username, password) => {
  return dispatch => {
    console.log(username, password);
    return axios
      .post("http://localhost:3000/api/v1/login", {
        id: username,
        password: password
      })
      .then(resp => {
        console.log("res", resp.data.jwt);
        console.log("this is also about to set shit");

        localStorage.setItem("token", resp.data.jwt);
        dispatch(loginUser(resp.data.user));
      })
      .catch(error => {
        console.log("error", error);
      });
  };
};

export const userLogOut = () => {
  return dispatch => {
    console.log("loggingOut called");
    localStorage.removeItem("token");
    return dispatch(logoutUser());
  };
};

const loginUser = userObj => ({
  type: LOGIN_USER,
  payload: userObj
});

const logoutUser = () => ({
  type: LOGOUT_USER
});
