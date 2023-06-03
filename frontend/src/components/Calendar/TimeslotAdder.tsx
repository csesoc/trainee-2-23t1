import Datepicker from "react-tailwindcss-datepicker"
import HourSelect from "../meeting_arrangement/HourSelect"
import { parseISO, setHours } from "date-fns"
import { useState } from "react"
import { trpc } from "../../utils/trpc"


const TimeslotAdder: React.FC<{calendarId: string, trigger: boolean, setTrigger: any}> = (props) => {

    const [details, setDetails] = useState("");

    const [startHour, setStartHour] = useState(12);
    const [endHour, setEndHour] = useState(13);


    const addTimeslot = trpc.calendar.addTimeslot.useMutation();

    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })

    const time = {
        startTime: setHours(date.startDate, startHour),
        endTime: setHours(date.endDate, endHour)
    }

    let valid = true;
    if (time.startTime >= time.endTime) {
      valid = false
    }

    let error;
    if (valid === false) {
      error = <div>Finish hour must occur after start hour</div>
    }

    const handleAdd = () => {
        const x = addTimeslot.mutate({
          calendarId: props.calendarId,
          timeslot: {
            startTime: time.startTime,
            endTime: time.endTime,
            details: details
          }
        })
        window.location.reload(false);
      }

    const handleValueChange = (newValue:any) => {
        const res = {
          startDate: parseISO(newValue.startDate),
          endDate: parseISO(newValue.endDate)
        }
    
        // Dirty fix if the calendar field is cleared
        if (newValue.startDate === null || newValue.endDate === null) {
          res.startDate = new Date()
          res.endDate = new Date()
        }
        setDate(() => res);
    } 

    return(
        <div>
            <div className="text-red-600 ml-7">
                <i>{error}</i>
            </div>
            <div className="p-5 bg-slate-300 rounded-xl flex flex-col gap-4">
                <div className="flex flex-row items-center  justify-start gap-3">
                    <Datepicker
                        primaryColor={"teal"} 
                        useRange={false}
                        asSingle={true} 
                        value={date} 
                        onChange={handleValueChange} 
                    /> 
                    <HourSelect value={startHour} onChange={setStartHour} hasError={valid}></HourSelect>
                    <HourSelect value={endHour} onChange={setEndHour} hasError={valid}></HourSelect>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <input value={details} onChange={(e) => setDetails(e.target.value)} className="bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-1 sm:text-sm placeholder:italic" placeholder="Event Name"></input>
                    <button className="w-10 h-9 bg-blue-400 rounded-md hover:bg-blue-500 transition-colors " onClick={handleAdd} disabled={addTimeslot.isLoading}>
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TimeslotAdder