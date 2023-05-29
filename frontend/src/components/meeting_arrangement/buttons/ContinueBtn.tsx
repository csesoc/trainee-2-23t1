import React, { useContext } from "react"
import { HandlerContext } from "../../../pages/meeting_arrangement/Arrange"

const ContinueBtn: React.FC = () => {
  const stepController = useContext(HandlerContext)

  return (
    <button className="px-5 py-2 bg-blue-400 rounded-full text-darkWhite" onClick={stepController.advanceStep}>
      Continue
    </button>
  )
}

export default ContinueBtn
