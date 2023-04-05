import React from "react";
import { useState } from 'react';
import { endOfWeek, format, startOfWeek } from 'date-fns'

/* 
  calendar: [hour][day] = k
    k: 0 -> unknown
       1 -> unavaliable
       2 -> avaliable
*/

const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date())

  const exampleData: number[][] = []
  for (let i = 0; i < 24; i++) {
    const days = [];
    for (let j = 0; j < 7; j++) {
      const k = Math.floor(Math.random() * 3)
      days[j] = k;
    }
    exampleData[i] = days;
  }

  const days = ["HOUR", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
  const hours = ["12am","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm"]
  
  const getColour = (k: number) => {
    const styles = ["bg-orange-300","bg-stone-100", "bg-green-200"]
    return styles[k]
  }

  const listDays = days.map(day => 
    <th scope="col" className="border border-slate-400 text-xs font-bold text-center text-gray-500 uppercase">
      {day}
    </th>
    )

  const calendarCells = exampleData.map((hour, i) => {
    const calendar = hour.map((day, j) => {
     return (<td className={`border border-slate-400 text-sm text-gray-800 w-40 ${getColour(exampleData[i][j])}`}></td>) 
    })
    return (
    <tr>
      <td className="border border-slate-400 w-20 py-2 text-xs text-gray-800 whitespace-nowrap text-center">{hours[i]}</td>
      {calendar}
    </tr>
    )
  })

  return (
    <div className="flex flex-col h-screen">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden">
            <div className=" px-5 my-2 flex flex-row justify-between content-center flex-wrap">
              <a className="text-gray-600 flex flex-row hover:text-blue-500" onClick={() => setDate(new Date(date.setDate(date.getDate() - 7)))}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <div className="text-base">
                    <time dateTime={format(startOfWeek(date), 'yyyy-MM-dd')}>
                      {format(startOfWeek(date), 'do')}
                    </time>
                </div>
              </a>
              <div className="text-gray-600 ">
                <div className="rounded-full bg-blue-700 text-white text-sm px-8 py-1">{date.toLocaleString('default', { month: 'long' })}</div>
              </div>
              <a className="text-gray-600 flex flex-row hover:text-blue-500" onClick={() => setDate(new Date(date.setDate(date.getDate() + 7)))}>
                <div className="text-base">
                    <time dateTime={format(endOfWeek(date), 'yyyy-MM-dd')}>
                      {format(endOfWeek(date), 'do')}
                    </time>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </a>
            </div>
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-50">
                <tr className="border border-slate-400">
                  {listDays}  
                </tr>
              </thead>
              <tbody>
                {calendarCells}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar
