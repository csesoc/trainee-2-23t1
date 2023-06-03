import React, { EventHandler, FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import CalendarControl from "./CalendarControl";
import Calendar, { CalendarData } from "./Calendar";

const ArrangeCalendar: React.FC<{userIds: string[], highlight?: {details: string, day: number, hour: {start: number, end:number}}, date: Date, setDate: any}> = (props) => {

  const r = trpc.calendar.getSharedCalendar.useQuery({
    userIds: props.userIds,
    date: props.date
  })

  if (r.isLoading || r.data === undefined) {
    return <div>Loading!</div>
  }

  const data: CalendarData = {
    days: r.data.days
  }

  if (props.highlight !== undefined) {
    data.highlight = props.highlight
  }

  
  return (
    <div>
      <CalendarControl date={props.date} setDate={props.setDate} />
      <Calendar data={data} />
    </div>
  )
}
export default ArrangeCalendar
