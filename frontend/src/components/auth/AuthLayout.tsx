import React from "react";
import AuthCard from "./AuthCard";

const AuthLayout: React.FC<{isLogin: boolean}> = ({ isLogin }) => {
  return (
    <div className="h-screen w-screen flex place-content-end bg-center bg-cover bg-[url('../../../public/waves.jpg')]">
      <AuthCard isLogin={isLogin} className="w-[65%] rounded-l-2xl drop-shadow-2xl" />
    </div>
  )
}

export default AuthLayout
