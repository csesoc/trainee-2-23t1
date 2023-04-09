import React from "react";

const DashBoardAbout: React.FC = () => {
  return (
    <>
      <div className="text-black
                      lg:ml-[230px]
                      md:ml-[97.5px]"
                      >
        <p
          className="not-italic font-semibold leading-[24px]
                      lg:mt-[60px] lg:text-[25px]
                      md:mt-[39px] md:text-[15px]"
        >
          About me
        </p>
        <div
          className="bg-gray-300/20rounded-3xl shadow-lg flex flex-left
                     lg:mt-[14px] lg:w-[354px] lg:h-[122px]
                     md:mt-[10.5px] md:w-[190.5px] md:h-[76.5px]"
        >
          <p
            className="not-italic leading-[24px]
                       lg:py-[17px] lg:px-[19px] lg:text-[20px]
                       md:py-[12.75px] md:px-[14.25px] md:text-[15px]"
          >
            stop stalking me 🙈
          </p>
        </div>
      </div>
    </>
  );
};

export default DashBoardAbout;
