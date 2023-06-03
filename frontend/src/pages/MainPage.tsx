import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import CalendarTest from "./CalendarTest";
import TimeslotAdder from "../components/Calendar/TimeslotAdder";


const MainPage: React.FC = () => {
  const [trigger, setTrigger] = useState(true)
  return (
    <div className="flex justify-around items-center">
      <div className="bg-gray-500 w-56 h-56"></div>
      <div>
        <TimeslotAdder calendarId="646cb1da47ac2c8b59c89bf1" trigger={trigger} setTrigger={setTrigger}/>
      </div>
      <div className="w-[45%] mt-5">
        <CalendarTest calendarId="646cb1da47ac2c8b59c89bf1" trigger={trigger} setTrigger={setTrigger}/>
      </div>
    </div>
  )
}

export default MainPage;