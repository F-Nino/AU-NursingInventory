import { LOGIN_USER, LOGOUT_USER, ERROR_LOGIN } from "../actions/actionTypes";

const initialAuth = {
  isSignedIn: false,
  isLoading: false,
  currentUser: null,
  isWrongLogin: false,
};

const loadState = () => {
  try {
    const access_token = localStorage.getItem("token");
    console.log("is the token there?", access_token);
    if (access_token) {
      return {
        auth: {
          ...initialAuth,
          isSignedIn: true,
        },
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
      return {
        ...state,
        currentUser: action.payload,
        isSignedIn: true,
        isWrongLogin: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
        isSignedIn: false,
        isWrongLogin: false,
      };
    case ERROR_LOGIN:
      return {
        ...state,
        currentUser: null,
        isSignedIn: false,
        isWrongLogin: true,
      };
    default:
      return state;
  }
}
