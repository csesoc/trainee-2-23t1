import React, { createContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { trpc } from "../utils/trpc";

const UserIdProvider = createContext('')

const ProtectedRoutes: React.FC<{ isDark: boolean, handleDark: Function }> = ({ isDark, handleDark }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />
  }

  const getSelfId = trpc.hello.helloWorld.useQuery(undefined, {
    staleTime: Infinity
  })

  const [selfId, setSelfId] = useState('')
  useEffect(() => {
    setSelfId(getSelfId.data)
  }, [getSelfId.isFetched])

  return (
    <UserIdProvider.Provider value={selfId}>
      <div className={isDark ? "dark" : ""}>
        <Navbar handleToggleDark={handleDark} />
        <div className="dark:bg-[#121212] dark:text-darkWhite h-screen">
          <Outlet />
        </div>
      </div>
    </UserIdProvider.Provider>
  )
}

export default ProtectedRoutes
export { UserIdProvider }