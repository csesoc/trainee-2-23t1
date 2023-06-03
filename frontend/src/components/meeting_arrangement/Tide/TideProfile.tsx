import React, { useContext } from "react";
import PlusIcon from "../../../assets/Icons/PlusIcon";
import MinusIcon from "../../../assets/Icons/MinusIcon";
import { InvitationContext, TInvited } from "../../../pages/meeting_arrangement/Arrange";

type TTideProfile = {
  person: TInvited,
  added: boolean,
}

const TideProfile: React.FC<TTideProfile> = (props) => {
  const {person, added} = props

  const invitationController = useContext(InvitationContext)[1]
  const divClicked = (person: TInvited) => {
    if (added) {
      invitationController.handleRemoveInvited(person)
    } else {
      invitationController.handleAddInvited(person)
    }
  }

  return (
    <div onClick={() => divClicked(person)} 
      className={added ? "cursor-pointer bg-slate-700 flex flex-row text-white rounded-xl p-5 m-5" : "cursor-pointer bg-navbar flex flex-row text-white rounded-xl p-5 m-5"}>
      <img 
        src="../../../public/anya.jpeg"
        alt="user profile picture"
        className="h-10 w-10 rounded-full cursor-pointer object-cover mx-3"
      />
      <div className="flex flex-col">
        <p className="font-semibold">{person.name}</p>
        <p>{person.email}</p>
      </div>
      <button className="px-3">
        {added ? <MinusIcon/> : <PlusIcon />}
      </button>
    </div>
  )
}

export default TideProfile