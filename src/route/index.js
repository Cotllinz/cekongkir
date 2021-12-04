import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import WrappedHomePage from "../pages/HomePage";
import HistoryOngkir from "../pages/HistoryOngkir";
import LoginPage from "../pages/Login";

function Pages() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <WrappedHomePage {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <LoginPage {...props} />}
          />
          <PrivateRoute path="/history">
            <HistoryOngkir />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
const SimpleAuth = {
  isAuthenticated: false,
  signin(cb) {
    SimpleAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    SimpleAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};
const authContext = createContext();
function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export function useAuth() {
  return useContext(authContext);
}
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user === "sudah login" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function useProvideAuth() {
  const [user, setUser] = useState("belum login");

  const signin = (cb) => {
    console.log(cb, "ini cb");
    console.log(SimpleAuth);
    return SimpleAuth.signin(() => {
      setUser("sudah login");
      cb();
    });
  };

  const signout = (cb) => {
    return SimpleAuth.signout(() => {
      setUser("belum login");
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}
export default Pages;
