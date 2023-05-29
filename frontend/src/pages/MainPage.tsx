import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CalendarTest from "./CalendarTest";


const MainPage: React.FC = () => {
  return (
    <div className="flex justify-around items-center w-screen">
      <div className="bg-gray-500 w-56 h-56"></div>
      <div className="w-[45%] mt-5">
        <CalendarTest/>
      </div>
    </div>
  )
}

export default MainPage;