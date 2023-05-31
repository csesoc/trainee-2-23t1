import React, { useState } from "react";
import ContinueBtn from "./buttons/ContinueBtn";
import BackBtn from "./buttons/BackBtn";
import ArrangeCalendar from "../Calendar/ArrangementCalendar";
import ColourKey from "./ColourKey";
import Datepicker from "react-tailwindcss-datepicker"; 
import HourSelect from "./HourSelect";
import { getHours, isSameWeek, parseISO, setHours } from "date-fns";
import { start } from "repl";
import { trpc } from "../../utils/trpc";
import getDay from "date-fns/getDay";

const CheckAvailability: React.FC<{date: Date, userIds: string[]}> = (props) => {

  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(0);


  const [date, setDate] = useState(new Date())

  const [day, setDay] = useState({ 
    startDate: new Date(),
    endDate: new Date()
    }); 


  const time = {
    startTime: setHours(day.startDate, startHour),
    endTime: setHours(day.startDate, endHour)
  }

  let valid = true;
  if (time.startTime > time.endTime) {
    valid = false
  }

  const r = trpc.calendar.checkAvaliable.useQuery({
    userIds: props.userIds,
    startDate: time.startTime,
    endDate: time.endTime
  })
    
  const handleValueChange = (newValue:any) => {
    console.log(newValue)
    const res = {
      startDate: parseISO(newValue.startDate),
      endDate: parseISO(newValue.endDate)
    }

    // Dirty fix if the calendar field is cleared
    if (newValue.startDate === null || newValue.endDate === null) {
      res.startDate = new Date()
      res.endDate = new Date()
    }
    setDay(() => res);
    setDate(() => res.startDate);
    } 
    return (
    <div>
      <div className="flex justify-around w-screen">
        <div className=" mt-10">
          <div className="text-4xl"><b>Who's actually available?</b></div>
          <div className="text-2xl">Proposed Meeting Time</div>
          <div className="p-5 flex flex-row items-center bg-slate-300 rounded-xl justify-start gap-3">
            <Datepicker
              primaryColor={"teal"} 
              useRange={false}
              asSingle={true} 
              value={day} 
              onChange={handleValueChange} 
            /> 
            <HourSelect value={startHour} onChange={setStartHour} hasError={valid}></HourSelect>
            <HourSelect value={endHour} onChange={setEndHour} hasError={valid}></HourSelect>
          </div>
          <div className="text-red-600">
            {valid? "": "Error: Finish hour must occur after start hour"}
          </div>
          <div className="text-red-600 ml-3">
            {valid && r.isSuccess && r.data.unavaliableNames.length > 0 ? `${r.data.unavaliableNames} can't make it`: ""} 
          </div>
          
          <ul className="list-disc">
            <ColourKey text="All avaliable" style="bg-green-200"/>
            <ColourKey text="Majority Avaliable" style="bg-green-400"/>
            <ColourKey text="Majority Unavaliable" style="bg-orange-200"/>
            <ColourKey text="All Unavaliable" style="bg-red-400"/>
            <ColourKey text="Chosen timeslot" style="bg-navbar"/>
          </ul>
          <BackBtn />
          <ContinueBtn isDisabled={valid}/>
        </div>
        <div className="w-[45%] mt-3">
          {(r.isSuccess && isSameWeek(date, time.startTime))? <ArrangeCalendar userIds={props.userIds} date={day.startDate} setDate={setDate} highlight={
              {day: getDay(date), 
              hour: {
                start: startHour,
                end: endHour
                },
              details: `${props.userIds.length-r.data.numUnavaliable}/${props.userIds.length}`
            }}/> 
          : <ArrangeCalendar userIds={props.userIds} date={date} setDate={setDate}/>}
          
        </div>
      </div>
    </div>
  )
}

export default CheckAvailability
