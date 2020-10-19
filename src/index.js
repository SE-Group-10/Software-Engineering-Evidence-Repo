import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./redux-handler/SessionStorage";

// Load all the states if they exist
const persistedState = loadState();
const store = createStore(
  allReducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Save all the States to Session Storage
store.subscribe(
  throttle(() => {
    saveState({
      seerUserReducer: store.getState().seerUserReducer,
    });
  }),
  1000
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
