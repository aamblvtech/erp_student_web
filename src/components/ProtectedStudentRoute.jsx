import React from "react";
import { Navigate } from "react-router-dom";
import { getStudentToken } from "../services/api";

export function ProtectedStudentRoute({ children }) {
  const token = getStudentToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
