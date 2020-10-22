import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0,0); // Scrolls to the top of the page.
    });
    return () => {
      unlisten();
    };
  }, [history]);

  // Function for testing vertical scroll position
  function checkPosition() {
    return document.body.scrollY;
  }

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
