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
import CalendarIcon from "../../assets/Icons/CalendarIcon";

const CheckAvailability: React.FC<{date: { 
  startDate: Date,
  endDate: Date,
  }, setDate: any, userIds: string[]}> = (props) => {

  const [startHour, setStartHour] = useState(getHours(props.date.startDate));
  const [endHour, setEndHour] = useState(getHours(props.date.endDate));


  const [calendarDate, setCalendarDate] = useState(props.date.startDate)


  const time = {
    startTime: setHours(props.date.startDate, startHour),
    endTime: setHours(props.date.endDate, endHour)
  }


  let valid = true;
  if (time.startTime >= time.endTime) {
    valid = false
  }

  const r = trpc.calendar.checkAvaliable.useQuery({
    userIds: props.userIds,
    startDate: time.startTime,
    endDate: time.endTime
  })
    
  const handleValueChange = (newValue:any) => {
    const res = {
      startDate: parseISO(newValue.startDate),
      endDate: parseISO(newValue.endDate)
    }

    // Dirty fix if the calendar field is cleared
    if (newValue.startDate === null || newValue.endDate === null) {
      res.startDate = new Date()
      res.endDate = new Date()
    }
    props.setDate(() => res);
    setCalendarDate(() => res.startDate)
    } 
  
  let error;
  if (valid === false) {
    error = <div>Error: Finish hour must occur after start hour</div>
  }
  if (valid === true && r.isSuccess && r.data.unavaliableNames.length > 0) {
    let avaliableStr = ""
    r.data.unavaliableNames.forEach((name: string, i: number) => {
      if (i > 0) {
        avaliableStr += ", "
      }
      avaliableStr += name;
    })
    avaliableStr += " can't make it"
    error = (
      <div className="flex flex-row items-center align-middle gap-1"> 
        <CalendarIcon/> 
        {avaliableStr}
      </div>
    )
  }
    return (
    <div>
      <div className="flex justify-around">
        <div className=" mt-20">
          <div className="text-4xl"><b>Who's actually available?</b></div>
          <div className="mt-10">
            <div className="text-2xl">Proposed Meeting Time</div>
            <div className="mt-8 ml-4 p-5 flex flex-row items-center bg-slate-300 rounded-xl justify-start gap-3">
              <Datepicker
                primaryColor={"teal"} 
                useRange={false}
                asSingle={true} 
                value={props.date} 
                onChange={handleValueChange} 
              /> 
              <HourSelect value={startHour} onChange={setStartHour} hasError={valid}></HourSelect>
              <HourSelect value={endHour} onChange={setEndHour} hasError={valid}></HourSelect>
            </div>
            <div className="text-red-600 ml-7">
              {error}
            </div>
          </div>
          <ul className="list-disc mt-20">
            <ColourKey text="All avaliable" style="bg-green-400"/>
            <ColourKey text="Majority Avaliable" style="bg-green-200"/>
            <ColourKey text="Majority Unavaliable" style="bg-orange-200"/>
            <ColourKey text="All Unavaliable" style="bg-red-400"/>
            <ColourKey text="Chosen timeslot" style="bg-navbar"/>
          </ul>
          <div className="flex flex-row justify-around">
            <BackBtn />
            <ContinueBtn isDisabled={!valid}/>
          </div>
        </div>
        <div className="w-[60%] mt-3">
          {(r.isSuccess && isSameWeek(calendarDate, time.startTime))? <ArrangeCalendar userIds={props.userIds} date={calendarDate} setDate={setCalendarDate} highlight={
              {day: getDay(time.startTime), 
              hour: {
                start: startHour,
                end: endHour
                },
              details: `${props.userIds.length-r.data.numUnavaliable}/${props.userIds.length}`
            }}/> 
          : <ArrangeCalendar userIds={props.userIds} date={calendarDate} setDate={setCalendarDate}/>}
          
        </div>
      </div>
    </div>
  )
}

export default CheckAvailability
