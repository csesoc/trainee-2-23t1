import React, { useContext, useState } from "react";
import BackBtn from "./buttons/BackBtn";
import Edit from "../../assets/Icons/Edit";
import CheckMark from "../../assets/Icons/CheckMark";
import { HandlerContext } from "../../pages/meeting_arrangement/Arrange";

const ConfirmTide: React.FC = () => {
  const controller = useContext(HandlerContext)

  const [titleEdit, setTitleEdit] = useState(false)

  const [title, setTitle] = useState("New Tide")

  return (
    <div className="py-10 px-10">
      <div className="flex justify-between">
        <form className="grid gap-5">
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
              <h3>&emsp;Thu 23rd March 2023 (Placeholder)</h3>
              <h3>&emsp;12-2pm (Placeholder)</h3>
              <button 
                type="button" 
                className="px-3 py-2 bg-blue-400 rounded-full my-2 text-white/90"
                onClick={controller.decrementStep}
              >
                Change Date & Time
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Repeat</h3>
              <select className="py-1 
                px-2 
                rounded-md 
                mt-2 
                bg-slate-200
                dark:bg-[#2c2c2c] 
                w-[150px]
              ">
                <option>None</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-lg">Location</h3>
            <input 
              type="text" 
              placeholder="Location"
              className="bg-slate-200
                placeholder:text-black/80
                rounded-lg 
                p-2
                w-[300px]
                dark:bg-[#2c2c2c]
                dark:border-gray-600 
                dark:placeholder:text-darkWhite
                focus:outline-none
                focus:w-[450px]
                transition-all
                duration-150" />
          </div>
        </form>

        <div>
          <BackBtn />
        </div>
      </div>
    </div>
  )
}

export default ConfirmTide
