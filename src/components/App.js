import "./App.css";
import React from "react";
import NavigationBar from "./general-components/NavigationBar";
import HomePage from "./pages/HomePage.js";
import SearchPage from "./pages/SearchPage.js";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SearchResultPage from "./pages/SearchResultPage";
import { Container } from "react-bootstrap";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Container fluid className="App-header">
        <Switch>
          {/* General Pages */}
          <Route exact path={["/index.html", "/"]}>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/dashboard" component={DashboardPage} />

          {/* Register-Login Pages */}
          <Route path="/login" component={LoginPage} />
          <Route path="/sign-up" component={SignUpPage} />

          {/* Search Results Page */}
          <Route path="/search-result" component={SearchResultPage}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
