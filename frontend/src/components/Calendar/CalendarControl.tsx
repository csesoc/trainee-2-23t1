import { format, endOfWeek, startOfWeek, isSameWeek, parseISO } from "date-fns"
import { useState } from "react"

const CalendarControl: React.FC<{date: Date, setDate: any}> = (props) => {
    return(
        <div className="my-2 flex flex-row grow-0 justify-between items-center content-center flex-wrap">
        <div className="w-20">
          <a className="text-navbar grow-0 font-bold flex flex-row hover:text-blue-500 cursor-pointer select-none" onClick={() => props.setDate(new Date(props.date.setDate(props.date.getDate() - 7)))}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-navbar">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <div className="text-base">
                <time>
                  {format(startOfWeek(props.date), 'do')}
                </time>
            </div>
          </a>
        </div>
        <div className="text-gray-600 font-semibold w-50 grow-0 text-center select-none">
          <div className={`rounded-full bg-navbar grow-0 text-white text-sm px-8 py-[6px] ${isSameWeek(props.date, new Date()) ? "": "opacity-90"}`}>
            <time>
              {format(props.date, 'do MMM yyy')}
            </time>
          </div>
        </div>
        <div className="w-16">
          <a className="text-navbar grow-0 font-bold flex flex-row hover:text-blue-500 cursor-pointer select-none" onClick={() => props.setDate(new Date(props.date.setDate(props.date.getDate() + 7)))}>
            <div className="text-base">
                <time>
                  {format(endOfWeek(props.date), 'do')}
                </time>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-navbar">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </div>
  </div>
    )
}

export default CalendarControl