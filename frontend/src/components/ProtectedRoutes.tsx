import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes
