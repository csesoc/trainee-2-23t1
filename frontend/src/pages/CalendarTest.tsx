import React, { EventHandler, FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";
import Calendar from "../components/Calendar/Calendar";
import { CalendarData } from "../components/Calendar/Calendar";
import { CalendarDay } from "../components/Calendar/Calendar";
import CalendarControl from "../components/Calendar/CalendarControl";

const CalenderTest: React.FC = () => {

  const [date, setDate] = useState(new Date())

  const r = trpc.calendar.getCalendar.useQuery({
    id: "646cb1da47ac2c8b59c89bf1",
    date: date
  })

  const mutation = trpc.calendar.addTimeslot.useMutation();
  // let data: CalendarData = {days: []}
  // for (let i = 0; i < 7; i++) {
  //   const day: CalendarDay = {hours: []}
  //   for (let j = 0; j < 24; j++) {
  //     day.hours[j] = {
  //       colour: "bg-orange-200",
  //       details: "Hello this is a long string!"
  //     }
  //   }
  //   data.days[i] = day
  // }
  // data.highlight= {
  //   day: 0,
  //   hour: {
  //     start: 2,
  //     end: 5
  //   }
  // }

  if (r.isLoading || r.data === undefined) {
    return <div>Loading!</div>
  }

  const data: CalendarData = {
    days: r.data.days, highlight: {
      details: "1/5",
      day: 0,
      hour: {
        start: 2,
        end: 5
      }
    }
  }

  const handleAdd = () => {
    const x = mutation.mutate({
      calendarId: "646cb1da47ac2c8b59c89bf1",
      timeslot: {
        startTime: new Date(2023, 4, 26, 20),
        endTime: new Date(2023, 4, 26, 22),
        details: "Fun Times!"
      }
    })
    console.log(x)
  }
  console.log(r.data)
  return (
    <div className="w-6/6">
      <CalendarControl date={date} setDate={setDate} />
      <Calendar data={data} />
      <button className="bg-navbar text-lg" onClick={handleAdd} disabled={mutation.isLoading}>
        Login
      </button>
    </div>
  )
}
export default CalenderTest
