import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import CalendarTest from "./CalendarTest";
import TimeslotAdder from "../components/Calendar/TimeslotAdder";
import { UserIdProvider } from "../components/ProtectedRoutes";
import { trpc } from "../utils/trpc";
import DashBoardInfoCard from "../components/board/DashBoardInfoCard";
import DashBoardAbout from "../components/board/DashBoardAbout";


const MainPage: React.FC = () => {
  const [trigger, setTrigger] = useState(true)
  const selfId = useContext(UserIdProvider)
  
  const r = trpc.user.getUserProfile.useQuery({token: selfId});
  const userInfo = r.data
  if (r.isLoading) {
    return(<div></div>)
  }
  return (
    <div className="flex flex-row justify-evenly items-center">
      <div className="flex flex-col justify-evenly items-center w-[45%]">
        {/* <div className="bg-gray-500 w-56 h-56"></div> */}

        <div className="flex flex-col mt-5 items-center">
              <DashBoardInfoCard />
              <DashBoardAbout />
              <div className="mt-5">
                <TimeslotAdder calendarId={userInfo.calendarId} trigger={trigger} setTrigger={setTrigger}/>
              </div>
        </div>
      </div>
      <div className="w-[45%] mt-5">
        <CalendarTest calendarId={userInfo.calendarId} trigger={trigger} setTrigger={setTrigger}/>
      </div>
    </div>
  )
}

export default MainPage;
