import React from "react";
import UserProfileInfoCard from "./UserProfileInfoCard";
import UserProfileButton from "./UserProfileButton";
import UserProfileDetailCard from "./UserProfileDetailCard";

const UserProfileLayout: React.FC = () => {
  return (
    <>
      <div className="bg-gray-300/20 flex items-center justify-center h-screen">
        <div className="h-[930px] w-[1890px] flex flex-row">
          <div className="flex flex-col">
            <div
              className="bg-white rounded-3xl shadow-lg flex flex-col items-center text-black
                        lg:ml-[230px] lg:mt-[179px] lg:w-[400px] lg:h-[469px]
                        md:ml-[97.5px] md:mt-[112.5px] md:w-[190.5px] md:h-[277.5px]"
            >
              <UserProfileInfoCard />
              <UserProfileButton />
            </div>
          </div>
          <UserProfileDetailCard />
        </div>
      </div>
    </>
  );
};

export default UserProfileLayout;
