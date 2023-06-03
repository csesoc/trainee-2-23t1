import React, { useContext } from "react";
import TideInvite from "./Tide/TideInvite";
import InvitedList from "./Tide/InvitedList";
import ContinueBtn from "./buttons/ContinueBtn";
import { Link } from "react-router-dom";
import { InvitationContext } from "../../pages/meeting_arrangement/Arrange";

const TideCreatePage: React.FC = () => {
  const [invited, inviteHandler] = useContext(InvitationContext)

  return (
      <div className="flex justify-between p-10 h-[80%]">
        <TideInvite />
        <div className="w-[45%] flex flex-col">
          <InvitedList invited={invited} handleRemoveInvited={inviteHandler.handleRemoveInvited} />
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