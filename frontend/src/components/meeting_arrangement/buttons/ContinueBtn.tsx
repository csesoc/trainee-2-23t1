import React, { useContext } from "react"
import { HandlerContext } from "../../../pages/meeting_arrangement/Arrange"
import ForwardIcon from "../../../assets/Icons/ForwardIcon"

const ContinueBtn: React.FC = () => {
  const stepController = useContext(HandlerContext)

  return (
    <button className="px-5 py-2 bg-blue-400 rounded-full text-darkWhite flex" onClick={stepController.advanceStep}>
      <ForwardIcon />
      <span>Continue</span>
    </button>
  )
}

export default ContinueBtn
