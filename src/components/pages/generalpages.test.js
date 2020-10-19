// Required packages for testing
import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

// Components to be tested
import HomePage from "./HomePage.js";
import LoginPage from "./LoginPage.js";
import SearchPage from "./SearchPage.js";
import SearchResultPage from "./SearchResultPage.js";
import SignUpPage from "./SignUpPage.js";

// Redux Related Imports
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "../../reducers";

// Redux Store
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Snapshot tests for UI testing.
test("Home Page Renders properly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Login Page Renders properly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Search Page Renders properly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Search Result Page Renders properly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <SearchResultPage />
        </Router>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Sign Up Renders properly", () => {
  const tree = renderer
    .create(
      <Router>
        <SignUpPage />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
