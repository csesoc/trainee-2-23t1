import React, { useContext, useMemo, useState } from "react";
import BackBtn from "./buttons/BackBtn";
import Edit from "../../assets/Icons/Edit";
import CheckMark from "../../assets/Icons/CheckMark";
import { HandlerContext, InvitationContext, TInvited } from "../../pages/meeting_arrangement/Arrange";
import PaperPlane from "../../assets/Icons/PaperPlane";
import { trpc } from "../../utils/trpc";
import { useNavigate } from "react-router-dom";
import InvitedList from "./Tide/InvitedList";

enum ERepeat {
  NONE = 'None',
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly'
}

type TConfirmTide = {
  date: {
    startDate: Date,
    endDate: Date,
  }
}

const ConfirmTide: React.FC<TConfirmTide> = ({ date }) => {
  const controller = useContext(HandlerContext)
  const [invited, inviteHandler] = useContext(InvitationContext)

  const [titleEdit, setTitleEdit] = useState(false)

  const [title, setTitle] = useState("New Tide")

  const navigate = useNavigate()
  const [error, setError] = useState('')
  const submit = trpc.tide.submit.useMutation()
  const submitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(title)
    console.log(e.currentTarget.repeat.value)
    console.log(e.currentTarget.location.value)
    submit.mutate({
      tideTitle: title,
      proposedTime: date.startDate.toISOString(),
      endTime: date.endDate.toISOString(),
      containUsers: invited.map(i => i.uId),
      location: e.currentTarget.location.value,
      repeatType: (e.currentTarget.repeat.value as ERepeat).toUpperCase() as any // wack
    }, {
      onError: (e) => setError(e.message),
      onSuccess: () => navigate('/')
    })
  }

  const getConvertedDate = useMemo(() => {
    const dayConvert = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const dayStr = (d: number) => {
      const converter = ['st', 'nd', 'rd']
      if (d % 10 <= 3 && d % 10 != 0) {
        return `${d}${converter[(d % 10) - 1]}`
      }
      return `${d}th`
    }
    const monthConvert = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"]

    const currDate = date.startDate
    const day = dayConvert[currDate.getDay()]
    const dayStrr = dayStr(currDate.getDate())
    const month = monthConvert[currDate.getMonth()]

    return `${day} ${dayStrr} ${month} ${currDate.getFullYear()}`
  }, [date.startDate, date.endDate])

  const getConvertedTimeRange = useMemo(() => {
    const start = date.startDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      hour12: true
    })

    const end = date.endDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      hour12: true
    })

    return `${start}-${end}`
  }, [date.startDate, date.endDate])

  return (
    <div className="py-10 px-10 h-[80%]">
      <form className="flex justify-between h-full" onSubmit={submitForm}>
        <div className="flex flex-col gap-5">
          <div className="flex">
            {
              titleEdit ? 
                <input 
                  type="text" 
                  value={title} 
                  className="text-5xl p-0 m-0 mb-2 bg-transparent w-[400px] border-b-2 border-blue-400 focus:outline-none" 
                  onChange={(e) => setTitle(e.target.value)} 
                /> 
              :
                <div className="text-5xl p-0 m-0 mr-4 mb-2 bg-transparent">{title}</div>
            }
            
            <button type="button" onClick={() => setTitleEdit(t => !t)}>
              {titleEdit ? <CheckMark /> : <Edit />}
            </button>
          </div>

          <div className="flex gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-lg">Time & Date</h3>
              <h3>&emsp;{getConvertedDate}</h3>
              <h3>&emsp;{getConvertedTimeRange}</h3>
              <button 
                type="button" 
                className="px-3 py-2 bg-blue-400 rounded-full my-2 text-white/90 flex gap-1"
                onClick={controller.decrementStep}
              >
                <Edit />
                <span>Change Date & Time</span>
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Repeat</h3>
              <select
                name="repeat"
                defaultValue={ERepeat.NONE}
                className="py-1 
                px-2 
                rounded-md 
                mt-2 
                bg-slate-200
                dark:bg-[#2c2c2c] 
                w-[150px]
              ">
                <option value={ERepeat.NONE}>{ERepeat.NONE}</option>
                <option value={ERepeat.DAILY}>{ERepeat.DAILY}</option>
                <option value={ERepeat.WEEKLY}>{ERepeat.WEEKLY}</option>
                <option value={ERepeat.MONTHLY}>{ERepeat.MONTHLY}</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-lg">Location</h3>
            <input 
              type="text" 
              name="location"
              placeholder="Anywhere"
              className="bg-slate-200
                placeholder:text-black/30
                rounded-lg 
                p-2
                w-[300px]
                dark:bg-[#2c2c2c]
                dark:border-gray-600 
                dark:placeholder:text-darkWhite/30
                focus:outline-none
                focus:w-[450px]
                transition-all
                duration-150" />
          </div>

          {error != '' && 
            <div className="text-red-500">
              {error}
            </div>
          }
          
        </div>

        <div className="w-[45%] flex flex-col gap-5">
          <InvitedList invited={invited} handleRemoveInvited={inviteHandler.handleRemoveInvited} />
          <div className="flex gap-5 place-self-end">
            <button type="submit" className="flex gap-3 place-items-center bg-blue-400 py-1 px-4 rounded-full text-white/90">
              <span>Send Tide</span>
              <PaperPlane />
            </button>
            <BackBtn />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ConfirmTide