import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import NavigationBar from "./general-components/NavigationBar";
import HomePage from "./pages/HomePage.js";
import SearchPage from "./pages/SearchPage.js";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SearchResultPage from "./pages/SearchResultPage";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AnalystQueuePage from "./pages/AnalystQueuePage";
import ScrollToTop from "./general-components/ScrollToTop";

function App() {
  const location = useLocation();
  let isLoggedIn = useSelector((state) => state.seerUserReducer.isLoggedIn);
  const DefaultNavPages = () => (
    <div>
      <NavigationBar />
      <Switch location={location} key={location.pathname}>
        <Route
          path="/dashboard"
          render={(props) =>
            isLoggedIn ? <DashboardPage {...props} /> : <Redirect to="/home" />
          }
        />
        <Route path="/admin" component={AdminPage} />

        {/* Analyst Pages */}
        <Route path="/analyst-queue" component={AnalystQueuePage} />

        {/* Search Results Page */}
        <Route path="/search-result" component={SearchResultPage} />
      </Switch>
    </div>
  );

  const NoSearchNavPages = () => (
    <div>
      <Switch location={location} key={location.pathname}>
        {/* General Pages */}
        <Route exact path={["/index.html", "/"]}>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={HomePage} />
        <Route path="/search" component={SearchPage} />

        {/* Register-Login Pages */}
        <Route path="/login" component={LoginPage} />
        <Route path="/sign-up" component={SignUpPage} />

        <Route component={DefaultNavPages} />
      </Switch>
    </div>
  );

  return (
    <ScrollToTop>
      <Route>
        <Switch location={location} key={location.pathname}>
          <Route component={NoSearchNavPages} />
          <Route component={DefaultNavPages} />
          <Route path="" />
        </Switch>
      </Route>
    </ScrollToTop>
  );
}

export default App;
