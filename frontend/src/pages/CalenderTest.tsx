import React, { EventHandler, FormEvent, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";
import Calendar from "../components/calendar";
import { CalendarData } from "../components/calendar";
import { CalendarDay } from "../components/calendar";

const CalenderTest: React.FC = () => {
  const data: CalendarData = {days: []}
  for (let i = 0; i < 7; i++) {
    const day: CalendarDay = {hours: []}
    for (let j = 0; j < 24; j++) {
      day.hours[j] = [Math.floor(Math.random() * 5),Math.floor(Math.random() * 5)];
    }
    data.days[i] = day
  }
  return (
    <div className="w-6/6">
      <Calendar data={data}/>
    </div>
  )
}
export default CalenderTest
