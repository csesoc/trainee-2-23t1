import React from "react";
import PlusIcon from "../../../assets/Icons/PlusIcon";
import MinusIcon from "../../../assets/Icons/MinusIcon";


const TideProfile: React.FC<{
  name: string,
  email: string,
  handleClick: any,
  added: boolean
}> = (props) => {

  return (
    <div onClick={() => props.handleClick(props.name, props.email)} className={props.added ? "cursor-pointer bg-slate-700 flex flex-row text-white rounded-xl p-5 m-5" : "cursor-pointer bg-navbar flex flex-row text-white rounded-xl p-5 m-5"}>
       <img 
        src="../../../public/anya.jpeg"
        alt="user profile picture"
        className="h-10 w-10 rounded-full cursor-pointer object-cover mx-3"
      ></img>
      <div className="flex flex-col">
        <p className="font-semibold">{props.name}</p>
        <p>{props.email}</p>
      </div>
      <button className="px-3">
        {props.added ? <MinusIcon/> : <PlusIcon />}
      </button>
    </div>
  )
}

export default TideProfile