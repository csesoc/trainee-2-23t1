import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { CalendarData } from "../components/Calendar/Calendar";
import CalendarControl from "../components/Calendar/CalendarControl";
import Calendar from "../components/Calendar/Calendar"

const CalenderTest: React.FC<{calendarId: string, trigger: boolean, setTrigger: any}> = (props) => {
  const [date, setDate] = useState(new Date())
  const r = trpc.calendar.getCalendar.useQuery({
    id: props.calendarId,
    date: date
  })

  if (r.isLoading || r.data === undefined) {
    return <div>Loading!</div>
  }

  const data: CalendarData = {
    days: r.data.days
  }

  return (
    <div className="w-6/6">
      <CalendarControl date={date} setDate={setDate} />
      <Calendar data={data} />
    </div>
  )
}
export default CalenderTest