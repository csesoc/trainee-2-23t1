import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ProtectedRoutes: React.FC = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes
