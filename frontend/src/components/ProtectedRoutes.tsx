import React, { useState } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import Placeholder from "../pages/Placeholder";
import Navbar from "./Navbar/Navbar";
import { DarkMode } from "./interfaces";

const ProtectedRoutes: React.FC = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />
  }

  const [darkMode, setDarkmode] = useState(false);

  const handleToggleDark = () => {
    setDarkmode(prevState => !prevState);
    console.log(`toggled -> ${darkMode}`)
  }

  return (
    <div>
      <Navbar darkMode={darkMode} handleToggleDark={handleToggleDark}/>
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes
