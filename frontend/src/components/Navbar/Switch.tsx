import React from "react";
import { DarkMode } from "../interfaces";

const Switch: React.FC<DarkMode> = (props) => {

  let defaultCircle = " absolute cursor-pointer bg-gray-200 h-5 w-5 rounded-full transition-all duration-300 transform "
  if (props.darkMode) {
    defaultCircle += "mx-4"
  }
  let defaultForm = "cursor-pointer relative inline-block cursor-pointer h-5 w-9 rounded-full appearance-none bg-gray-900 bg-opacity-75 transition duration-300"
  if (props.darkMode) {
    defaultForm = "cursor-pointer relative inline-block cursor-pointer h-5 w-9 rounded-full appearance-none bg-opacity-75 transition duration-300 bg-green-600"
  }

  return (
    <div className="cursor-pointer mx-5">
      <label className="flex items-center">
        <input 
          type="checkbox"
          className={ defaultForm }
          onClick={props.handleToggleDark}
        />
        <span className={defaultCircle}/>
      </label>
    </div>
  )
}


export default Switch