import React, { useEffect, useState } from "react";
import UserProfileInfoCard from "./UserProfileInfoCard";
import UserProfileButton from "./UserProfileButton";
import UserProfileDetailCard from "./UserProfileDetailCard";

const UserProfileLayout: React.FC = () => {
  return (
    <>
      <div className="bg-gray-300/20 flex items-center justify-center h-screen">
        <div className="h-screen w-screen flex flex-row items-center justify-evenly">
          <div className="flex flex-col items-center justify-between">     
            <div
              className="bg-white rounded-3xl shadow-lg text-black flex flex-col items-center
                        lg:w-[400px] lg:h-[469px]
                        md:w-[190.5px] md:h-[277.5px]"
            >
              <UserProfileInfoCard />
            </div>
              <UserProfileButton />
          </div>
          <UserProfileDetailCard />
        </div>
      </div>
    </>
  );
};

export default UserProfileLayout;
