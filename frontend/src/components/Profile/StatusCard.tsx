import React, { useEffect, useRef } from "react";


const StatusCard: React.FC<{editStatus: boolean, setEditStatus: any }> = ({ editStatus, setEditStatus }) => {

  const statusMenu = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const closeStatus = (e: any) => {
      console.log("BONJOUR")
      if (statusMenu.current && editStatus && !statusMenu.current.contains(e.target)) {
        setEditStatus(false);
      }
    }
    document.addEventListener('mousedown', closeStatus)

    return () => {
      document.removeEventListener('mousedown', closeStatus)
    }
  }, [])

  return (
    // get new parts to show up more nicely bro!!!
    <div className="transition duration-500">
    <div className="z-20 absolute top-0 left-0 w-screen h-screen bg-black/30 flex items-center justify-center text-black">
      <div ref={statusMenu} className="z-30 relative w-96 h-64 bg-white flex flex-col justify-center items-start p-10 rounded-md">
        <h1 className="text-lg font-medium pb-3">Edit status</h1>
        <div className=" flex flex-col justify-center items-center">
          <form action="submit">
            <input type="text" placeholder="💀 Conducting rizzearch" className="p-3 rounded-md w-64 bg-gray-100 placeholder:text-gray-500 outline-none"/>
            <div className="flex flex-row">
              <p className="py-4 select-none pr-3">
                <button formAction="submit" className="rounded-lg bg-navbar text-white p-3">Set status</button>
              </p>
              <p className="py-4 select-none pl-2">
                <button onClick={() => setEditStatus(false)} className="rounded-lg bg-gray-200 text-black p-3">Cancel</button>
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