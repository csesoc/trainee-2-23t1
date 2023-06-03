import React from "react";

const UserProfileDetailCard: React.FC<{
  userName: string;
  userStatus: string;
  userDOB: string;
  userDegree: string;
  userPhone: string;
  userAbout: string;
}> = ({ userName, userStatus, userDOB, userDegree, userPhone, userAbout }) => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  console.log(windowHeight + " " + windowWidth);
  return (
    <>
      <div
        className="bg-white rounded-3xl shadow-lg flex flex-col text-black
                   min-w-[500px] min-h-[400px]"
      >
        <h1
          className="not-italic font-extrabold leading-[36px]
                      ml-[10px] mt-[10px] text-xl"
        >
          Profile
        </h1>
        <div className="flex flex-row items-center justify-around">
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px] text-sm
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Username
            </h1>
            <span className="flex items-center px-4 w-[200px] h-[30px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xs lg:mb-[20px]">
              {userName}
            </span>
          </div>
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px] text-sm
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              DOB
            </h1>
            <span className="flex items-center px-4 w-[200px] h-[30px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xs lg:mb-[20px]">
              {userDOB}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px] text-sm
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Degree
            </h1>
            <span className="flex items-center px-4 w-[200px] h-[30px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xs lg:mb-[20px]">
              {userDegree}
            </span>
          </div>
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px] text-sm
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Phone
            </h1>
            <span className="flex items-center px-4 w-[200px] h-[30px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xs lg:mb-[20px]">
              {userPhone}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-around mt-[15px]">
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px] text-sm
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Bio
            </h1>
            <span className="flex p-4 w-[200px] h-[180px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xs lg:mb-[20px]">
              {userAbout}
            </span>
          </div>
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px] text-sm
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Status
            </h1>
            <span className="flex p-4 w-[200px] h-[180px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xs lg:mb-[20px]">
              {userStatus}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileDetailCard;
