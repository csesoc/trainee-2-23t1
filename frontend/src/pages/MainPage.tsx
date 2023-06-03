import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import CalendarTest from "./CalendarTest";
import TimeslotAdder from "../components/Calendar/TimeslotAdder";
import { UserIdProvider } from "../components/ProtectedRoutes";
import { trpc } from "../utils/trpc";


const MainPage: React.FC = () => {
  const [trigger, setTrigger] = useState(true)
  const selfId = useContext(UserIdProvider)
  
  const r = trpc.user.getUserProfile.useQuery({token: selfId});
  const userInfo = r.data
  if (r.isLoading) {
    return(<div></div>)
  }
  return (
    <div className="flex justify-around items-center">
      <div className="bg-gray-500 w-56 h-56"></div>
      <div>
        <TimeslotAdder calendarId={userInfo.calendarId} trigger={trigger} setTrigger={setTrigger}/>
      </div>
      <div className="w-[45%] mt-5">
        <CalendarTest calendarId={userInfo.calendarId} trigger={trigger} setTrigger={setTrigger}/>
      </div>
    </div>
  )
}

export default MainPage;