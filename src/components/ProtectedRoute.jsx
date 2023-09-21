/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./store/useUserAuth";

const ProtectedRoute = ({ children }) => {
  let { currentUser } = useUserAuth();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoute;
