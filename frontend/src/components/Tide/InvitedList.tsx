import React, { useEffect } from "react";
import TideProfile from "./TideProfile";


const InvitedList: React.FC<{
  invited: {name: string, email: string}[],
  handleRemoveInvited: any
}> = (props) => {

  const list = props.invited.map(item => {
    return (
      <div className="py-2">
        <TideProfile name={item.name} email={item.email} handleClick={props.handleRemoveInvited} added={true} />
      </div>
    )
  })

  return (
    <div className="py-10 w-[40%] text-black">
      <div className="bg-gray-200 h-[99%] rounded-3xl p-7">
        <h2 className="font-semibold text-xl">Invited Members</h2>
        <div className="w-[130%] flex flex-row flex-wrap">
          {list}
        </div>
      </div>
    </div>
  )
}


export default InvitedList