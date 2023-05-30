import React from "react";
import ContinueBtn from "./buttons/ContinueBtn";
import BackBtn from "./buttons/BackBtn";

const ColourKey: React.FC<{style: string, text: string}> = (props) => {
  return (
    <div className="h-7 flex flex-row items-center my-4">
      <div className={`w-7 h-7 mr-2 ${props.style}`}>
      </div>
      <div className="text-center text-lg">
        {props.text}
      </div>
    </div>
  )
}

export default ColourKey