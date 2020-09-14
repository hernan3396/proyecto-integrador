import React from "react";
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
