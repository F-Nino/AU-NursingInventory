import { LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";
const initialState = {
  currentUser: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, currentUser: action.payload };
    case LOGOUT_USER:
      return { ...state, currentUser: null };
    default:
      return state;
  }
}
