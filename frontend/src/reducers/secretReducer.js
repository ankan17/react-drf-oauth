import { FETCH_SECRETS } from "../actions/constants";

const initialState = {
  secrets: []
};

const secretReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SECRETS:
      return {
        ...state,
        secrets: action.payload
      };
    default:
      return state;
  }
};

export default secretReducer;
