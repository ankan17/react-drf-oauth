import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./reducers";
import token_refresh from "./middlewares/token_refresh_middleware";

const initialState = {};

const history = require("history").createBrowserHistory();
const router_middleware = routerMiddleware(history);

const middleware = [router_middleware, token_refresh, thunk, logger];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
