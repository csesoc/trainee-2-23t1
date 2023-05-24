import React from "react";
import Navbar from "../components/Navbar/Navbar";


const MainPage: React.FC<{darkMode: boolean, handleToggleDark: any}> = (props) => {
  return (
    <div className={props.darkMode ? "dark" : "light"}>
      <Navbar handleToggleDark={props.handleToggleDark}/>
    </div>
  )
}

export default MainPage;