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
  handleAddInvited: (person: TInvited) => void,
  handleRemoveInvited: (person: TInvited) => void
}

type TUseInvite = [
  TInvited[],
  TInviteController
]

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

  return [invited, {handleAddInvited, handleRemoveInvited}] as TUseInvite
}

// Bending the rules a bit
const HandlerContext: React.Context<TController> = createContext({} as TController)
const InvitationContext: React.Context<TUseInvite> = createContext([[{}], {}] as TUseInvite) // very wack

const Arrange: React.FC = () => {
  const [currStep, stepController] = useArrangeSteps()

  const invitation = useInviteMembers()
  const invite = invitation[0]

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
      <InvitationContext.Provider value={invitation}>
        {
          currStep == 1 ? <TideCreatePage /> :
          currStep == 2 ? <CheckAvailability date={meetingDate} setDate={setMeetingDate} userIds={[...invitedUsers, selfId]} /> :
          currStep == 3 ? <ConfirmTide date={meetingDate} /> :
          undefined
        }
      </InvitationContext.Provider>
    </HandlerContext.Provider>
  )
}

export default Arrange
export { HandlerContext, InvitationContext }
export type { TInvited, TInviteController }