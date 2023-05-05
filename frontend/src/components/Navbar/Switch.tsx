import React from "react";
import { DarkMode } from "../interfaces";

const Switch: React.FC<DarkMode> = (props) => {

  let defaultCircle = "absolute cursor-pointer bg-gray-200 h-5 w-5 rounded-full transition-all duration-300 transform "
  if (props.darkMode) {
    defaultCircle += "mx-9"
  } else {
    defaultCircle +=  "mx-5"
  }

  return (
    <label className="flex items-center" htmlFor="toggle-switch">
      <input 
        type="checkbox"
        id='toggle-switch'
        className="relative inline-block cursor-pointer h-5 w-9 rounded-full appearance-none bg-gray-900 bg-opacity-75 transition duration-300 checked:bg-green-600 mx-5"
        defaultChecked={props.darkMode}
        onChange={props.handleToggleDark}
      />
      <span className={defaultCircle} />
    </label>
  )
}


export default Switch