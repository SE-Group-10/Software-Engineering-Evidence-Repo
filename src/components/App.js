import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import NavigationBar from "./general-components/NavigationBar";
import HomePage from "./pages/HomePage.js";
import SearchResultPage from "./pages/SearchResultPage.js";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SubmissionPage from "./pages/SubmissionPage";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import ArticleQueue from "./article-queue-components/ArticleQueue";
import ScrollToTop from "./general-components/ScrollToTop";

function App() {
  const location = useLocation();
  let isLoggedIn = useSelector((state) => state.seerUserReducer.isLoggedIn);
  let user_information = useSelector(
    (state) => state.seerUserReducer.user_information
  );

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
        <Route path="/article-posting" component={SubmissionPage} />
        <Route
          path="/article-queue"
          render={(props) =>
            isLoggedIn &&
            (user_information.user_type === "moderator" ||
              user_information.user_type === "analyst") ? (
              <ArticleQueue {...props} />
            ) : (
              <Redirect to="/home" />
            )
          }
        />

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

        {/* Register-Login Pages */}
        <Route
          path="/login"
          render={(props) =>
            !isLoggedIn ? <LoginPage {...props} /> : <Redirect to="/home" />
          }
        />
        <Route
          path="/sign-up"
          render={(props) =>
            !isLoggedIn ? <SignUpPage {...props} /> : <Redirect to="/home" />
          }
        />

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
