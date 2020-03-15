import { LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";

const initialAuth = {
  isSignedIn: false,
  isLoading: false,
  currentUser: null
};

const loadState = () => {
  try {
    const access_token = localStorage.getItem("token");
    console.log("is the token there?", access_token);
    if (access_token) {
      return {
        auth: {
          ...initialAuth,
          isSignedIn: true
        }
      };
    } else {
      return { auth: initialAuth };
    }
  } catch (err) {
    console.log(err);
    return { auth: initialAuth };
  }
};

const initialState = loadState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, currentUser: action.payload, isSignedIn: true };
    case LOGOUT_USER:
      return { ...state, currentUser: null, isSignedIn: false };
    default:
      return state;
  }
}
