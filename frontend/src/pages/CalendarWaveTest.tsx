import React, { EventHandler, FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";
import { CalendarData } from "../components/Calendar/Calendar";
import { CalendarDay } from "../components/Calendar/Calendar";
import CalendarControl from "../components/Calendar/CalendarControl";
import Calendar from "../components/Calendar/Calendar"

const CalenderWaveTest: React.FC = () => {
  const [date, setDate] = useState(new Date())

  const r = trpc.calendar.getWaveCalendar.useQuery({
    id: "6471b550a8e9dc5719f65f7d",
    date: date
  })

  if (r.isLoading || r.data === undefined) {
    return <div>Loading!</div>
  }

  const data: CalendarData = {
    days: r.data.days, highlight: {
      details: "1/5",
      day: 4,
      hour: {
        start: 2,
        end: 5
      }
    }
  }

  console.log(r.data)
  return (
    <div className="w-6/6">
      <CalendarControl date={date} setDate={setDate} />
      <Calendar data={data} />
    </div>
  )
}
export default CalenderWaveTest
