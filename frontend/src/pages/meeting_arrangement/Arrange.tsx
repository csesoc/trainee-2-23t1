import React, { createContext, useState } from "react";
import InviteUsers from "../../components/meeting_arrangement/InviteUsers";
import CheckAvailability from "../../components/meeting_arrangement/CheckAvailability";
import ConfirmTide from "../../components/meeting_arrangement/ConfirmTide";

const useArrangeSteps = () => {
  const [step, setStep] = useState(1)

  const advanceStep = () => {
    setStep(s => s + 1)
  }

  const decrementStep = () => {
    setStep(s => s - 1)
  }

  return [step, {advanceStep, decrementStep}]
}

type TController = {
  advanceStep: () => void,
  decrementStep: () => void
}

// Bending the rules a bit
const HandlerContext: React.Context<TController> = createContext({} as TController)

const Arrange: React.FC = () => {
  const [currStep, stepController] = useArrangeSteps()

  const [invitedMember, setInvitedMembers] = useState()

  const [meetingDate, setMeetingDate] = useState({ 
    startDate: new Date(),
    endDate: new Date()
    }); 

  return (
    <HandlerContext.Provider value={stepController as TController}>
      {
        currStep == 1 ? <InviteUsers /> :
        currStep == 2 ? <CheckAvailability date={meetingDate} setDate={setMeetingDate} userIds={["6471a0e72afcdd7f44dad4cb","6471a1f82afcdd7f44dad4cd"]} /> :
        currStep == 3 ? <ConfirmTide /> :
        undefined
      }
    </HandlerContext.Provider>
  )
}

export default Arrange
export { HandlerContext }
