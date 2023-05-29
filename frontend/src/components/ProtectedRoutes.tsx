import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const ProtectedRoutes: React.FC<{ isDark: boolean, handleDark: Function }> = ({ isDark, handleDark }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <Navbar handleToggleDark={handleDark} />
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes