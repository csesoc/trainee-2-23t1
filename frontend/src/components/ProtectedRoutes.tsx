import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const ProtectedRoutes: React.FC = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />
  }

  const [darkMode, setDarkmode] = useState(false);

  const handleToggleDark = () => {
    console.log("toggled!")
    setDarkmode(prevState => !prevState);
  }

  return (
    <div>
      <Navbar darkMode={darkMode} handleToggleDark={handleToggleDark}/>
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes
