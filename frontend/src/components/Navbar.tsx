import { eventNames } from "process";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";


const Navbar: React.FC = () => {
  // initialising state for the dropdown menu that is toggled when clicked on profile image
  const [dropdown, setDropdown] = useState(false);

  const navRef = useRef(null);

  const [darkmode, setDarkmode] = useState(false);

  // const dropdownRef = useRef(null)

  // useEffect(() => {
    
  //   const closeDropdown = (event: any) => {
  //     if (event.path[0] !== dropdownRef.current) {
  //       setDropdown(false);
  //     }
  //   }

  //   document.body.addEventListener('click', closeDropdown);
    
  //   // returned function will run when component is unmounted
  //   return () => document.body.removeEventListener('click', closeDropdown);
  // }, [])


  const handleProfClick = () => {
    console.log("(insert expanded prof settings")
    setDropdown(prevState => !prevState)
  }

  return (
    <div ref={navRef}>
      <div className="top-0 px-2 py-1 flex flex-wrap bg-navbar text-white">
        
        {/* 1st group: cse waves logo, waves branding and search bar */}
        <div className="flex flex-row flex-auto items-center p-2 justify-start">
          <img
            src="../images/cseWaves.png"
            className="h-10 w-10 rounded-full mr-3"
          ></img>
          <h1
            className="text-xl antialiased font-semibold"
          >
            Waves
          </h1>
          <form className="px-20 items-center">
            <label>
              <input 
                placeholder="🔎 Search Waves" 
                type="text" 
                className=" 
                      outline-none text-white py-1 px-4 bg-gray-300/20 rounded-lg 
                      focus:bg-gray-900 focus:w-96
                "
              ></input>
            </label>
          </form>
        </div>

        {/* 2nd group: navigation icons, new tide button and profile */}
        <div className="flex flex-row items-center justify-around">
          <Link to="/dashboard"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg></Link>
          <Link to="/wave-status"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
          </svg></Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <Link to="/tide-create"><button
            className="bg-blue-500 px-6 py-1 rounded-2xl mx-5"
          >
            New Tide
          </button></Link>
          {/* replace the image source later with given user profile pic stored on database */}
          <button
            onClick={handleProfClick}
            className="h-10 w-10 rounded-full cursor-pointer flex justify-center items-center mx-1"
          >
            <img 
              src="../../images/anya.jpeg"
              alt="user profile picture"
              className="h-10 w-10 rounded-full cursor-pointer object-cover"
            ></img>
          </button>
        </div>
      </div>
      <div className="pt-1">
        {dropdown && <ProfileDropdown/>}
      </div>
    </div>
  )
}

export default Navbar
