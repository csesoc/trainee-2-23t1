import React, { EventHandler, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { trpc } from "../../utils/trpc";

const StatusCard: React.FC<{
  editStatus: boolean, setEditStatus: any,
  userStatus: string, handleStatusChange: any
}> = ({ editStatus, setEditStatus, userStatus, handleStatusChange }) => {

  const statusMenu = useRef<HTMLInputElement>(null);
  const [errMsg, setErrMsg] = useState('')
  
  useEffect(() => {
    const closeStatus = (e: any) => {
      if (statusMenu.current && editStatus && !statusMenu.current.contains(e.target)) {
        setEditStatus(false);
      }
    }
    document.addEventListener('mousedown', closeStatus)

    return () => {
      document.removeEventListener('mousedown', closeStatus)
    }
  }, [])

  const submitEndpoint = trpc.user.statusChange.useMutation()

  const submitFnc: EventHandler<FormEvent> = useCallback((event) => {
    event.preventDefault()

    const userToken = localStorage.getItem("token");
    
    if (typeof userToken === 'undefined' || userToken === null) {
      setErrMsg("Invalid token!")
      return;
    }
    const formInput: any = event.target
    submitEndpoint.mutate({
      token: userToken,
      status: formInput.status.value
    }, {
      onSuccess: (data: any) => {
        handleStatusChange(data.status)
        setEditStatus(false)
      },
      onError: (error: any) => {
        setErrMsg(error.message)
      },
    })
  }, [])

  return (
    <div className="transition duration-500">
    <div className="z-20 absolute top-0 left-0 w-screen h-screen bg-black/40 flex items-center justify-center text-black dark:text-darkWhite">
      <div ref={statusMenu} className="z-30 relative w-96 h-64 bg-white dark:bg-gray-800/50 flex flex-col justify-center items-start p-10 rounded-md">
        <h1 className="text-lg font-medium pb-3">Edit status</h1>
        <div className=" flex flex-col justify-center items-center">
          <form onSubmit={submitFnc} autoComplete="off">
            <input name="status" type="text" placeholder={userStatus} className="p-3 rounded-md w-64 bg-gray-100 dark:bg-gray-800 placeholder:text-gray-500 outline-none"/>
            {errMsg !== '' && <p>{errMsg}</p>}
            <div className="flex flex-row">
              <p className="py-4 select-none pr-3">
                <button type="submit" className="rounded-lg bg-navbar text-white p-3">Set status</button>
              </p>
              <p className="py-4 select-none pl-2">
                <button type="button" onClick={() => setEditStatus(false)} className="rounded-lg bg-gray-200 dark:bg-gray-600 text-black dark:text-darkWhite p-3">Cancel</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default StatusCard;