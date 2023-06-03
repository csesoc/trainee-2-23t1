import React from "react";
import TideProfile from "./TideProfile";
import { TInvited } from "../../../pages/meeting_arrangement/Arrange";


const InvitedList: React.FC<{
  invited: TInvited[],
  handleRemoveInvited: (invited: TInvited) => void,
}> = (props) => {

  const list = props.invited.map(item => {
    return (
      <div key={item.uId} className="py-2">
        <TideProfile key={item.uId} person={item} added={true} />
      </div>
    )
  })

  return (
    <div className="bg-gray-200 rounded-3xl p-7 mt-7 text-black h-full">
      <h2 className="font-semibold text-xl">Invited Members</h2>
      <div className="w-[130%] flex flex-row flex-wrap">
        {list}
      </div>
    </div>
  )
}


export default InvitedList