import React from "react";
import MeetingIcon from "../../assets/Icons/Meeting";


/* 
  calendar: [hour][day] = k
    k: 0 -> unknown
       1 -> unavaliable
       2 -> avaliable
*/

export interface CalendarDay {
  hours: [unavaliable: number,avaliable: number][]
}

export interface CalendarData {
  days: CalendarDay[]
  highlight?: {
    start: {
      day: number,
      hour: number,
    }
    end: {
      day: number,
      hour: number,
    }
  }
}

const Calendar = (props: {data: CalendarData}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = ["12am","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm"]
  
  const getColour = (unavaliable:number, avaliable: number) => {
    const total = unavaliable + avaliable;

    if (unavaliable === 0 && avaliable === 0) {
      return "bg-stone-100"
    }
    if (avaliable === total) {
      return "bg-green-400"
    }
    if (unavaliable === total) {
      return "bg-red-400"
    }

    if (avaliable > unavaliable) {
      return "bg-green-200"
    }

    return "bg-orange-200"
  }

  const renderCalendar = () => {
    let r = [];
    for (let hour = -1; hour < 24; hour++) {
      for (let day = -1; day < 7; day++) {
         r.push(cell(day, hour))
      }
    }
    return r
  }

  const cell = (x: number, y: number) => {
    if (x < 0) {
      return (
        <div className="border border-neutral-500 font-bold text-gray-500 uppercase">
          {hours[y]}
        </div>
      )
    }
    if (y < 0) {
      return (
        <div className="border border-neutral-500 font-bold text-gray-500 uppercase">
          {days[x]}
        </div>
      )
    }

    const [unavaliable, avaliable] = props.data.days[x].hours[y]

    let border = "";
    if (props.data.highlight !== undefined) {

      const start = props.data.highlight.start
      const end = props.data.highlight.end
      if (start.day === x && y > start.hour && y < end.hour) {
        return;
      }

      if (start.day === x && start.hour === y) {
        const diff = end.hour-start.hour
        return(       
          <div id={`${x}-${y}`} style={{gridRow: `span ${diff} /span ${diff}`}} className={`border border-neutral-500 text-neutral-700 group`}>
            <div className="m-0 h-full bg-navbar text-center align-middle transition-all duration-500">
              <div className="opacity-0 group-hover:opacity-100 transition duration-500 text-white">
                <div className="pt-2">
                  <MeetingIcon/>
                  <b>{avaliable}/{unavaliable + avaliable}</b>
                </div>
              </div>
            </div>
          </div>
       )
      }
    } 
    
    return (
      <div id={`${x}-${y}`} className={`border border-neutral-500 ${border} h-8 text-neutral-700 group ${getColour(unavaliable, avaliable)}`}>
        <div className="opacity-0 group-hover:opacity-100 transition duration-500">
          <b>{avaliable}/{unavaliable + avaliable}</b>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-8 text-center">
      {renderCalendar()}
    </div>
  );
}

export default Calendar
