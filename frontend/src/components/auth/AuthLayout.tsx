import React from "react";
import AuthCard from "./AuthCard";

const AuthLayout: React.FC<{isLogin: boolean}> = ({ isLogin }) => {
  return (
    <div className="h-screen">
      <AuthCard isLogin={isLogin} />
    </div>
  )
}

export default AuthLayout
