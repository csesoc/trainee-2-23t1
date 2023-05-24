import React from "react";
import MeetingIcon from "../../assets/Icons/Meeting";

export interface CalendarDay {
  hours: number[]
}

export interface CalendarData {
  days: CalendarDay[]
  highlight?: {
    day: number,
    hour: {
      start: number,
      end: number,
    }
  },
  numUsers: number,
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
        <div key={`${x}-${y}`} className="border border-neutral-500 font-bold text-gray-500 uppercase">
          {hours[y]}
        </div>
      )
    }
    if (y < 0) {
      return (
        <div key={`${x}-${y}`} className="border border-neutral-500 font-bold text-gray-500 uppercase">
          {days[x]}
        </div>
      )
    }

    const avaliable = props.data.days[x].hours[y]

    let border = "";
    if (props.data.highlight !== undefined) {

      const startHour = props.data.highlight.hour.start
      const endHour = props.data.highlight.hour.end

      if (props.data.highlight.day === x && y > startHour && y < endHour) {
        return;
      }

      if (props.data.highlight.day === x && startHour === y) {
        const diff = endHour-startHour
        return(       
          <div key={`${x}-${y}`} style={{gridRow: `span ${diff} /span ${diff}`}} className={`border border-neutral-500 text-neutral-700 group`}>
            <div className="m-0 h-full bg-navbar text-center align-middle transition-all duration-500">
              <div className="opacity-0 group-hover:opacity-100 transition duration-500 text-white">
                <div className="pt-2">
                  <MeetingIcon/>
                  <b>{avaliable}/{props.data.numUsers}</b>
                </div>
              </div>
            </div>
          </div>
       )
      }
    } 
    
    return (
      <div key={`${x}-${y}`} className={`border border-neutral-500 ${border} h-8 text-neutral-700 group ${getColour(props.data.numUsers - avaliable, avaliable)}`}>
        <div className="opacity-0 group-hover:opacity-100 transition duration-500">
          <b>{avaliable}/{props.data.numUsers}</b>
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
