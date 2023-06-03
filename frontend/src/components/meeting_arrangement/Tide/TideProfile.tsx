import React from "react";
import PlusIcon from "../../../assets/Icons/PlusIcon";
import MinusIcon from "../../../assets/Icons/MinusIcon";
import { TInvited } from "../../../pages/meeting_arrangement/Arrange";

type TTideProfile = {
  person: TInvited
  handleClick: (person: TInvited) => void,
  added: boolean,
}

const TideProfile: React.FC<TTideProfile> = (props) => {
  const {person, handleClick, added} = props

  return (
    <div onClick={() => handleClick(person)} className={added ? "cursor-pointer bg-slate-700 flex flex-row text-white rounded-xl p-5 m-5" : "cursor-pointer bg-navbar flex flex-row text-white rounded-xl p-5 m-5"}>
       <img 
        src="../../../public/anya.jpeg"
        alt="user profile picture"
        className="h-10 w-10 rounded-full cursor-pointer object-cover mx-3"
      ></img>
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