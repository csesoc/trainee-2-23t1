import React, { useContext } from "react";
import { HandlerContext } from "../../../pages/meeting_arrangement/Arrange";

const BackBtn: React.FC = () => {
  const stepController = useContext(HandlerContext)

  return (
    <button type="button" className="bg-slate-500 text-darkWhite px-5 py-2 rounded-full" onClick={stepController.decrementStep}>
      Back
    </button>
  )
}

export default BackBtn
