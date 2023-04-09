import React from "react";
import DashBoardInfoCard from "./DashBoardInfoCard";
import DashBoardAbout from "./DashBoardAbout";

const DashBoardInfoLayout: React.FC = () => {
  return (
    <>
      <div className="bg-gray-300/20 flex items-center justify-center h-screen">
        <div className="h-[930px] w-[1890px] flex flex-row">
          <div className="flex flex-col">
            <DashBoardInfoCard />
            <DashBoardAbout />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardInfoLayout;
