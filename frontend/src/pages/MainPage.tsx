import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CalenderTest from "./CalenderTest";


const MainPage: React.FC<{darkMode: boolean, handleToggleDark: any}> = (props) => {

  return (
    <div>
      <Navbar darkMode={props.darkMode} handleToggleDark={props.handleToggleDark}/>
      <CalenderTest/>
    </div>
  )
}

export default MainPage;