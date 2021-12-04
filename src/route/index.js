import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WrappedHomePage from "../pages/HomePage";
function Pages() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <WrappedHomePage {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default Pages;
