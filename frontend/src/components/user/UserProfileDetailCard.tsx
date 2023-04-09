import React from "react";

const UserProfileDetailCard: React.FC = () => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  console.log(windowHeight + " " + windowWidth);
  return (
    <>
      <div
        className="bg-white rounded-3xl shadow-lg flex flex-col text-black
                      lg:ml-[140px] lg:mt-[130px] lg:w-[920px] lg:h-[680px]"
      >
        <h1
          className="not-italic font-extrabold leading-[36px]
                      lg:ml-[31px] mt-[27px] lg:text-[30px]"
        >
          Profile
        </h1>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px]
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Username
            </h1>
            <span className="flex items-center px-4 w-[300px] h-[40px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xl lg:mb-[20px]">
              marktran
            </span>
          </div>
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px]
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              DOB
            </h1>
            <span className="flex items-center px-4 w-[300px] h-[40px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xl lg:mb-[20px]">
              dd/mm/yy
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px]
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Degree
            </h1>
            <span className="flex items-center px-4 w-[300px] h-[40px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xl lg:mb-[20px]">
              Computer Science
            </span>
          </div>
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px]
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Phone
            </h1>
            <span className="flex items-center px-4 w-[300px] h-[40px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xl lg:mb-[20px]">
              +61 410 000 000
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px]
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Bio
            </h1>
            <span className="flex p-4 w-[300px] h-[180px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xl lg:mb-[20px]">
              stop stalking me 🙈
            </span>
          </div>
          <div className="flex flex-col">
            <h1
              className="not-italic font-semibold leading-[29px]
                          lg:mt-[32px] lg:text-[24px] lg:mb-[20px]"
            >
              Status
            </h1>
            <span className="flex p-4 w-[300px] h-[180px] bg-profile-grid text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-xl lg:mb-[20px]">
              training with the rizzly-bear 😮‍💨
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileDetailCard;
