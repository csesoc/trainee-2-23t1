import React, { useContext } from "react"
import { HandlerContext } from "../../../pages/meeting_arrangement/Arrange"

const ContinueBtn: React.FC<{isDisabled?: boolean}> = (props) => {
  let disabled = props.isDisabled
  if (props.isDisabled === undefined) {
    disabled = false
  }
  const stepController = useContext(HandlerContext)

  return (
    <button disabled={props.isDisabled} className={`px-5 py-2 disabled:bg-gray-500 bg-blue-400 rounded-full text-darkWhite`} onClick={stepController.advanceStep}>
      Continue 
    </button>
  )
}

export default ContinueBtn
