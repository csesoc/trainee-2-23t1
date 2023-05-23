import React, { EventHandler, FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";
import Calendar from "../components/Calendar/Calendar";
import { CalendarData } from "../components/Calendar/Calendar";
import { CalendarDay } from "../components/Calendar/Calendar";
import CalendarControl from "../components/Calendar/CalendarControl";

const CalenderTest: React.FC = () => {
  let data: CalendarData = {days: [], numUsers: 5}
  for (let i = 0; i < 7; i++) {
    const day: CalendarDay = {hours: []}
    for (let j = 0; j < 24; j++) {
      day.hours[j] = Math.floor(Math.random() * 6);
    }
    data.days[i] = day
  }
  data.highlight= {
    unavaliable: 2,
    day: 0,
    hour: {
      start: 2,
      end: 5
    }
  }
  const [date, setDate] = useState(new Date())
  return (
    <div className="w-6/6">
      <CalendarControl date={date} setDate={setDate}/>
      <Calendar data={data}/>
    </div>
  )
}
export default CalenderTest
