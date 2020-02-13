import { combineReducers } from "redux";
import authReducer from "./authReducer";
import reportReducer from "./reportReducer";

const rootReducer = combineReducers({
  authState: authReducer,
  reportState: reportReducer
});

export default rootReducer;
