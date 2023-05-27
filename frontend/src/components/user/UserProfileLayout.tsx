import React, { useEffect, useState } from "react";
import UserProfileInfoCard from "./UserProfileInfoCard";
import UserProfileButton from "./UserProfileButton";
import UserProfileDetailCard from "./UserProfileDetailCard";

const UserProfileLayout: React.FC = () => {
  return (
    <>
      <div className="bg-gray-300/20 flex items-center justify-center h-screen">
        <div className="h-screen w-screen flex flex-row items-center justify-evenly">
            <div
              className="bg-white rounded-3xl shadow-lg flex flex-col items-center text-black
                        lg:w-[400px] lg:h-[469px]
                        md:w-[190.5px] md:h-[277.5px]"
            >
              <UserProfileInfoCard />
              <UserProfileButton />
            </div>
          <UserProfileDetailCard />
        </div>
      </div>
    </>
  );
};

export default UserProfileLayout;
