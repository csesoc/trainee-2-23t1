import React from "react";
import { useState } from 'react';
import { endOfWeek, format, setDate, startOfWeek } from "date-fns";


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
  const [date, setDate] = useState(new Date())
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
        console.log(diff)
        return(       
          <div id={`${x}-${y}`} style={{gridRow: `span ${diff} /span ${diff}`}} className={`border border-neutral-500 text-neutral-700 group`}>
            <div className="m-0 hover:ml-1 hover:-mt-1 w-full h-full bg-indigo-700 hover:rounded-3xl drop-shadow-2xl text-center align-middle transition-all duration-500">
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
    <div className="flex flex-col h-screen">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block text-center">
          <div className="my-2 flex flex-row grow-0 justify-between items-center content-center flex-wrap">
                <div className="w-20">
                  <a className="text-navbar grow-0 font-bold flex flex-row hover:text-blue-500 cursor-pointer select-none" onClick={() => setDate(new Date(date.setDate(date.getDate() - 7)))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-navbar">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <div className="text-base">
                        <time dateTime={format(startOfWeek(date), 'yyyy-MM-dd')}>
                          {format(startOfWeek(date), 'do')}
                        </time>
                    </div>
                  </a>
                </div>
                <div className="text-gray-600 font-semibold w-50 grow-0 text-center select-none">
                  <div className="rounded-full bg-navbar grow-0 text-white text-sm px-8 py-[6px]">
                    <time>
                      {format(date, 'do MMM yyy')}
                    </time>
                  </div>
                </div>
                <div className="w-16">
                  <a className="text-navbar grow-0 font-bold flex flex-row hover:text-blue-500 cursor-pointer select-none" onClick={() => setDate(new Date(date.setDate(date.getDate() + 7)))}>
                    <div className="text-base">
                        <time dateTime={format(endOfWeek(date), 'yyyy-MM-dd')}>
                          {format(endOfWeek(date), 'do')}
                        </time>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-navbar">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
          </div>
          <div className="grid grid-cols-8">
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar
