import React, { useEffect, useRef, useState } from "react";
import Notification from "./Notification";


const NotificationCentre: React.FC<{
  notificationSee: boolean, 
  setNotificationSee: any, 
}> = (props) => {

  const [notifs, setNotifs] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const notifMenu = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const closeNotifMenu = (e: any) => {
      if (notifMenu.current && props.notificationSee && !notifMenu.current.contains(e.target)) {
        props.setNotificationSee(false);
      }
    }

    document.addEventListener('mousedown', closeNotifMenu)
    
    return () => {
      document.removeEventListener('mousedown', closeNotifMenu)
    }
  })

  return (
    <div ref={notifMenu} className="absolute right-64 top-[68px] h-auto z-10 bg-navbar dark:bg-gray-800 flex justify-center items-center text-black p-2 rounded-xl float-right">
      <div className="z-20 bg-white dark:bg-black dark:text-darkWhite h-auto flex flex-col rounded-xl max-h-96 overflow-auto scroll-smooth">
        <div>
          <p className="pt-3 px-3 py-2 text-lg">Notifications</p>
          <hr className="pb-2"></hr>
        </div>
      {
        notifs.length === 0 ? <div>&nbsp;You don't have any notifications.&nbsp;</div> : (
          notifs.map(notif => {
            return (
              <Notification />
            )
          })
        )
      }
      </div>
    </div>
  )
}


export default NotificationCentre;