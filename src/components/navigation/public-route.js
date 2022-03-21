import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = (props) => {
  const { cred, profile } = useSelector((state) => state.user)

  return profile && cred ? <Redirect to="/app/supplies/inventory" /> : <Route {...props} />;
};

export default PublicRoute;
