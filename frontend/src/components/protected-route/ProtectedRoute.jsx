import React from "react";
import { useUser } from "../../contexts/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userCtx = useUser();

  if (!userCtx?.user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
