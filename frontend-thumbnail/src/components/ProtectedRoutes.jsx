import React from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the login page

    return <Navigate to="/login" replace />;
  } // If they are authenticated, render the component they are trying to access

  return children;
};

export default ProtectedRoute;
