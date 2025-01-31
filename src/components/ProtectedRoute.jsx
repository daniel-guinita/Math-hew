import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role"); // Retrieve role from local storage

  if (!role || !allowedRoles.includes(role)) {
    // Redirect to login if the role is not authorized
    alert("You do not have permission to access this page."); // Optional alert
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
