import { combineReducers } from "redux";

import authReducer from "./authReducer";
import secretReducer from "./secretReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  secret: secretReducer
});

export default rootReducer;
