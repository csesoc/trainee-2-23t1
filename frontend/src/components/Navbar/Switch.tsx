import React from "react";
import { DarkMode } from "../interfaces";

const Switch: React.FC<{
  handleToggleDark: any
}> = (props) => {

  return (
    <div className="cursor-pointer mx-5">
      <label className="flex items-center">
        <input 
          type="checkbox"
          className="cursor-pointer relative inline-block h-5 w-9 rounded-full appearance-none bg-gray-900 dark:bg-green-600 bg-opacity-75 transition duration-300"
          onClick={props.handleToggleDark}
        />
        <span className="dark:mx-4 absolute cursor-pointer bg-gray-200 h-5 w-5 rounded-full transition-all duration-300 transform"/>
      </label>
    </div>
  )
}


export default Switch