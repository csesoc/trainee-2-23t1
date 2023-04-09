import React from "react";
import DashBoardInfoCard from "./DashBoardInfoCard";
import DashBoardAbout from "./DashBoardAbout";

const DashBoardInfoLayout: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100	h-screen w-screen flex flex-col">
        <DashBoardInfoCard />
        <DashBoardAbout />
      </div>
    </>
  );
};

export default DashBoardInfoLayout;
