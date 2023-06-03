import React, { createContext, useContext, useMemo, useState } from "react";
import CheckAvailability from "../../components/meeting_arrangement/CheckAvailability";
import ConfirmTide from "../../components/meeting_arrangement/ConfirmTide";
import TideCreatePage from "../../components/meeting_arrangement/TideCreatePage";
import { setHours } from "date-fns";
import { UserIdProvider } from "../../components/ProtectedRoutes";

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

type TInvited = {
  uId: string,
  name: string,
  email: string
}

type TInviteController = {
  handleAddInvited: () => void,
  handleRemoveInvited: () => void
}

const useInviteMembers = () => {
  const [invited, setInvited] = useState<TInvited[]>([])

  const handleAddInvited = (prop: TInvited) => {
    setInvited(old => [...old, prop])
  }

  const handleRemoveInvited = (prop: TInvited) => {
    const index = invited.findIndex(item => prop.uId === item.uId)
    if (index > -1) {
      const currInvited = invited.slice()
      currInvited.splice(index, 1)
      setInvited(currInvited)
    }
  }

  return [invited, {handleAddInvited, handleRemoveInvited} as TInviteController]
}

// Bending the rules a bit
const HandlerContext: React.Context<TController> = createContext({} as TController)

const Arrange: React.FC = () => {
  const [currStep, stepController] = useArrangeSteps()

  const [invite, setInvite] = useInviteMembers()

  const [meetingDate, setMeetingDate] = useState({ 
    startDate: new Date(setHours(Date.now(),12)),
    endDate: new Date(setHours(Date.now(),13))
  }); 

  const selfId = useContext(UserIdProvider)
  const invitedUsers = useMemo(() => {
    return (invite as TInvited[]).map(i => i.uId)
  }, [invite])

  return (
    <HandlerContext.Provider value={stepController as TController}>
      {
        currStep == 1 ? <TideCreatePage invited={invite as TInvited[]} inviteHandler={setInvite as TInviteController} /> :
        currStep == 2 ? <CheckAvailability date={meetingDate} setDate={setMeetingDate} userIds={[...invitedUsers, selfId]} /> :
        currStep == 3 ? <ConfirmTide date={meetingDate} invited={invite as TInvited[]} handleRemove={(setInvite as TInviteController).handleRemoveInvited} /> :
        undefined
      }
    </HandlerContext.Provider>
  )
}

export default Arrange
export { HandlerContext }
export type { TInvited, TInviteController }
