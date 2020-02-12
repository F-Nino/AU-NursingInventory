import { SAVE_REPORT_DATA } from "../actions/actionTypes";
const initialState = {
  reportData: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_REPORT_DATA:
      return { ...state, reportData: action.payload };
    default:
      return state;
  }
}
