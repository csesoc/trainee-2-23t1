import React, { EventHandler, FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";
import Calendar from "../components/Calendar/Calendar";
import { CalendarData } from "../components/Calendar/Calendar";
import { CalendarDay } from "../components/Calendar/Calendar";
import CalendarControl from "../components/Calendar/CalendarControl";

const CalenderTest: React.FC = () => {
  let data: CalendarData = {days: []}
  for (let i = 0; i < 7; i++) {
    const day: CalendarDay = {hours: []}
    for (let j = 0; j < 24; j++) {
      day.hours[j] = [Math.floor(Math.random() * 5),Math.floor(Math.random() * 5)];
    }
    data.days[i] = day
  }
  data.highlight= {
    start: {
      day: 0,
      hour: 2,
    },
    end: {
      day: 0,
      hour: 5,
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
