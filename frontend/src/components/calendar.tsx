import React from "react";
import { useState } from 'react';
import { endOfWeek, format, startOfWeek } from 'date-fns'


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
  highlight?: [][]
}

const Calendar = (props: {data: CalendarData}) => {
  const [date, setDate] = useState(new Date())

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = ["12am","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm"]
  
  const getColour = (unavaliable:number, avaliable: number) => {
    const total = unavaliable + avaliable;
    if (unavaliable === 0 && avaliable === 0) {
      return "bg-stone-200"
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

  const listDays = days.map(day => 
    <th scope="col" className="border border-slate-400 text-xs font-bold text-center text-gray-500 uppercase">
      {day}
    </th>
    )

  const cx = () => {
    let r = [];
    for (let i = -1; i < 24; i++) {
      for (let j = -1; j < 7; j++) {
         r.push(c(j,i))
      }
    }
    return r
  }

  const c = (x: number, y: number) => {
    if (x < 0) {
      return (
        <div className="border border-slate-400 text-sm h-6 font-bold flex justify-center items-center text-gray-500 uppercase">
          {hours[y]}
      </div>
      )
    }
    if (y < 0) {
      return (
        <div className="border border-slate-400 text-sm h-6 font-bold flex justify-center items-center text-gray-500 uppercase">
          {days[x]}
        </div>
      )
    }
    const [unavaliable, avaliable] = props.data.days[x].hours[y]
    return (
      <div className={`border border-slate-400 h-6 text-gray-800 ${getColour(unavaliable, avaliable)}`}>
        {avaliable}/{unavaliable + avaliable}
      </div>
    )
  }

  const calendarCells = hours.map((hour, i) => {
    const calendar = days.map((day, j) => {
      const [unavaliable, avaliable] = props.data.days[j].hours[i]
     return (<td className={`border border-slate-400 text-sm text-gray-800 w-40 ${getColour(unavaliable, avaliable)}`}></td>) 
    })
    return (
    <tr>
      <td className="border border-slate-400 w-20 py-2 text-xs text-gray-800 whitespace-nowrap text-center">{hours[i]}</td>
      {calendar}
    </tr>
    )
  })

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden">
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
              <div className="text-gray-600 font-semibold w-36 grow-0 text-center select-none">
                <div className="rounded-full bg-navbar grow-0 text-white text-sm px-8 py-[6px]">{date.toLocaleString('default', { month: 'long' })}</div>
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
            <div className="grid grid-cols-8 mt-5">
              {cx()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar
