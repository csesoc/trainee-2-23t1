import React, { useState } from "react";
import ContinueBtn from "./buttons/ContinueBtn";
import BackBtn from "./buttons/BackBtn";
import ArrangeCalendar from "../Calendar/ArrangementCalendar";
import ColourKey from "./ColourKey";

const CheckAvailability: React.FC<{date: Date, userIds: string[]}> = (props) => {

  return (
    <div>
      <div className="flex justify-around w-screen">
        <div className=" mt-10">
          <div className="text-4xl"><b>Who's actually available?</b></div>
          <div className="text-2xl">Proposed Meeting Time</div>
          <div className=" text-xl rounded-lg bg-slate-200 px-5 flex flex-row items-center justify-end h-10">
          </div>
          <ul className="list-disc">
            <ColourKey text="All avaliable" style="bg-green-200"/>
            <ColourKey text="Majority Avaliable" style="bg-green-400"/>
            <ColourKey text="Majority Unavaliable" style="bg-orange-200"/>
            <ColourKey text="All Unavaliable" style="bg-red-400"/>
            <ColourKey text="Chosen timeslot" style="bg-navbar"/>
          </ul>
          <BackBtn />
          <ContinueBtn />
        </div>
        <div className="w-[45%] mt-3">
          <ArrangeCalendar userIds={props.userIds}/>
        </div>
      </div>
    </div>
  )
}

export default CheckAvailability
