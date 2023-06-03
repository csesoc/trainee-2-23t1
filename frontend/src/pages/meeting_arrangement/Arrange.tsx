import React, { createContext, useState } from "react";
import CheckAvailability from "../../components/meeting_arrangement/CheckAvailability";
import ConfirmTide from "../../components/meeting_arrangement/ConfirmTide";
import TideCreatePage from "../../components/meeting_arrangement/TideCreatePage";

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

  const [invitedMember, setInvitedMembers] = useState<string[]>([])

  return (
    <HandlerContext.Provider value={stepController as TController}>
      {
        currStep == 1 ? <TideCreatePage /> :
        currStep == 2 ? <CheckAvailability /> :
        currStep == 3 ? <ConfirmTide /> :
        undefined
      }
    </HandlerContext.Provider>
  )
}

export default Arrange
export { HandlerContext }
