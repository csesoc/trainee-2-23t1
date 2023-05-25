import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Switch from "./Switch";
import StatusCard from "../Profile/StatusCard";

const MAX_STATUS_LEN = 23;

const ProfileDropdown: React.FC<{
  userName: string,
  userEmail: string
  userStatus: string, handleStatusChange: any,
  handleToggleDark: any, 
  dropdown: boolean, setDropdown: any
}> = (props) => {
  
  const [editStatus, setEditStatus] = useState(false)
  const navigate = useNavigate()

  const profMenu = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const closeProfMenu = (e: any) => {
      if (profMenu.current && props.dropdown && !profMenu.current.contains(e.target)) {
        props.setDropdown(false);
      }
    }
    document.addEventListener('mousedown', closeProfMenu)

    return () => {
      document.removeEventListener('mousedown', closeProfMenu)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/login')
  }

  return (
    <div ref={profMenu}>
      <div className="absolute right-0 top-[68px] h-auto z-10 bg-navbar dark:bg-gray-800 flex justify-center items-center text-black p-2 rounded-xl float-right mr-4">
        <div className="z-20 bg-white h-auto flex flex-col rounded-xl dark:bg-black dark:text-darkWhite">

          {/* User name, email & profile */}
          <Link to="/settings"><div className="flex flex-row flex-wrap items-center px-1 py-2 cursor-pointer">
            <img 
              src="../../../public/anya.jpeg"
              className="h-10 w-10 rounded-full object-cover m-3"
            ></img>
            <div className="flex flex-col pr-3">
              <h1 className="text-lg font-semibold">{props.userName}</h1>
              <p className="text-sm font-light">{props.userEmail}</p>
            </div>
          </div></Link>

          {/* User custom status */}
          <div className="text-center transition hover:bg-gray-200/90 cursor-pointer dark:hover:bg-gray-800/50" onClick={() => setEditStatus(prevState => !prevState)}>
            <hr className="dark:opacity-50"></hr>
            <p className="py-2">{(props.userStatus.length <= MAX_STATUS_LEN) ? "💬 " + props.userStatus : "💬 " + props.userStatus.slice(0, 20) + "..."}</p>
            <hr className="dark:opacity-50"></hr>
          </div>

          {/* Settings */}
          <Link to="/settings">
            <div className="flex flex-row transition hover:bg-gray-200/90 dark:hover:bg-gray-800/50 w-auto px-6 py-4 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2>Settings</h2>
            </div>
          </Link>

          {/* Dark Mode */}
          <span className="flex flex-row transition items-center hover:bg-gray-200/90 dark:hover:bg-gray-800/50 w-auto px-6 py-3 mb-4 cursor-pointer" onClick={props.handleToggleDark}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
            <h2 className="select-none">Dark Mode</h2>
            <Switch handleToggleDark={props.handleToggleDark}/>
          </span>

          {/* Logout */}
          <div className="flex justify-center">
            <button onClick={handleLogout} className="rounded-full mb-3 border-2 border-red-400 text-red-500 p-[8px] w-[70%] hover:bg-red-50 dark:hover:bg-red-800/80 hover:text-red-800 dark:hover:text-red-200 transition duration-500">
              Logout
            </button>
          </div>
        </div>
      </div>
      { 
        editStatus 
        &&
        <StatusCard 
          editStatus={editStatus} 
          setEditStatus={setEditStatus}
          userStatus={props.userStatus}
          handleStatusChange = {props.handleStatusChange}
        /> 
      }
    </div>
  )
}


export default ProfileDropdown;