import React from "react";
import Navbar from "../components/Navbar/Navbar";


const MainPage: React.FC<{darkMode: boolean, handleToggleDark: any}> = (props) => {

  return (
    <div>
      <Navbar darkMode={props.darkMode} handleToggleDark={props.handleToggleDark}/>
    </div>
  )
}

export default MainPage;