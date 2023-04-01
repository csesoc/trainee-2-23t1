import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Placeholder from "../pages/Placeholder";

const WavesRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Placeholder />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default WavesRouter
