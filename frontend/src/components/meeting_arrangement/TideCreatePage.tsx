import React, { useState } from "react";
import TideInvite from "./Tide/TideInvite";
import InvitedList from "./Tide/InvitedList";
import ContinueBtn from "./buttons/ContinueBtn";
import { Link } from "react-router-dom";

const TideCreatePage: React.FC = () => {

  const [invited, setInvited] = useState<{name: string, email: string}[]>([])

  const handleAddInvited = (name: string, email: string) => {
    const newElem = {
      name: name,
      email: email
    }
    setInvited(old => [...old, newElem])
  }

  const handleRemoveInvited = (name: string, email: string) => {
    const index = invited.findIndex(item => item.name === name && item.email === email)
    console.log(index)
    if (index > -1) {
      const currInvited = invited.slice()
      currInvited.splice(index, 1)
      setInvited(currInvited)
    }
  }

  return (
      <div className="flex justify-between p-10 h-[80%]">
        <TideInvite handleAddInvited={handleAddInvited} />
        <div className="w-[45%] flex flex-col">
          <InvitedList invited={invited} handleRemoveInvited={handleRemoveInvited} />
          <div className="flex gap-5 mt-10 place-self-end">
            <Link to={'/'} className="text-white bg-gray-500/70 transition transform ease-in-out duration-200 hover:scale-110 px-5 py-2 rounded-full">
              Cancel
            </Link>
            <ContinueBtn />
          </div>
        </div>
      </div>
  )
}

export default TideCreatePage