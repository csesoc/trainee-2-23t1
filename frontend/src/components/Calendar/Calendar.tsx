import React from "react";

export const colours = [
  "bg-stone-100",
  "bg-green-200",
  "bg-green-400",
  "bg-orange-200",
  "bg-red-400",
]

export interface CalendarDay {
  hours: {
    colour: number,
    details?: string
  }[]
}

export interface CalendarData {
  //2D Array where each cell is the number of unavaliable users
  days: CalendarDay[]
  highlight?: {
    day: number,
    hour: {
      start: number,
      end: number,
    }
    details: string
  }
}

const Calendar: React.FC<{data: CalendarData}> = (props) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const hours = ["12am","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm"]

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

    const cellData = props.data.days[x].hours[y]

    let details = cellData.details
    if (details && details.length > 20) {
      details = details.slice(0,17) + "..."
    }

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
          <div key={`${x}-${y}`} style={{gridRow: `span ${diff} /span ${diff}`}} className="border border-neutral-500 text-neutral-700 group">
            <div className="flex h-full bg-navbar transition-all duration-500 items-center justify-center">
              <div className="transition duration-500 text-white text-lg whitespace-nowrap overflow-hidden">
                <b>{props.data.highlight.details}</b>
              </div>
            </div>
          </div>
       )
      }
    } 
    
    return (
      <div key={`${x}-${y}`} className={`${colours[cellData.colour]} border border-neutral-500 ${border} h-8 text-neutral-700 group `}>
        <div className="opacity-0 md:group-hover:opacity-100 transition duration-500 whitespace-nowrap overflow-hidden">
          {details}
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
