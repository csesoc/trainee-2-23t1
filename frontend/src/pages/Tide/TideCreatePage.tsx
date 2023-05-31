import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TideInvite from "../../components/Tide/TideInvite";
import InvitedList from "../../components/Tide/InvitedList";
import ForwardIcon from "../../assets/Icons/ForwardIcon";

const TideCreatePage: React.FC<{
  darkMode: boolean,
  handleToggleDark: any
}> = (props) => {

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
    <div className={props.darkMode ? "dark" : "light"}>
      <div className="dark:bg-black h-screen">
        <div className="h-[95%]">
          <Navbar handleToggleDark={props.handleToggleDark}/>
          <div className="flex justify-around w-screen h-[85%]">
            <TideInvite handleAddInvited={handleAddInvited} />
            <InvitedList invited={invited} handleRemoveInvited={handleRemoveInvited} />
          </div>
          <div className="flex flex-row justify-end items-center">
            <button className="text-white bg-gray-500/70 transition transform ease-in-out duration-200 hover:scale-110 px-7 py-4 rounded-full">
              Cancel
            </button>
            <button className="text-white bg-blue-500 hover:bg-blue-600 transition transform duration-200 ease-in-out hover:scale-110 p-4 rounded-full mx-5 w-30 flex flex-row">
              <div className="mr-2">
                <ForwardIcon/>
              </div>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TideCreatePage