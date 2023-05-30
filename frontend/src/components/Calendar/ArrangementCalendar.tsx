import React, { EventHandler, FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import CalendarControl from "./CalendarControl";
import Calendar, { CalendarData } from "./Calendar";

const ArrangeCalendar: React.FC<{userIds: string[]}> = (props) => {
  const [date, setDate] = useState(new Date())

  const r = trpc.calendar.getSharedCalendar.useQuery({
    userIds: props.userIds,
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
    <div>
      <CalendarControl date={date} setDate={setDate} />
      <Calendar data={data} />
    </div>
  )
}
export default ArrangeCalendar
