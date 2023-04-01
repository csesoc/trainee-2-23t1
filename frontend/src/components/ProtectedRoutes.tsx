import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import Placeholder from "../pages/Placeholder";

const ProtectedRoutes: React.FC = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoutes
