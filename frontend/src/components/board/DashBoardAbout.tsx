import React from "react";

const DashBoardAbout: React.FC = () => {
  return (
    <>
      <div className="text-black
                      xl:ml-[130px]
                      2xl:ml-[260px]">
        <p
          className="not-italic font-semibold leading-[24px]
                      xl:mt-[52px] xl:text-[20px]
                      2xl:mt-[104px] 2xl:text-[40px]"
        >
          About me
        </p>
        <div
          className="bg-gray-200 rounded-3xl shadow-lg flex flex-left
                     xl:mt-[14px] xl:w-[254px] xl:h-[102px]
                     2xl:mt-[28px] 2xl:w-[508px] 2xl:h-[204px]"
        >
          <p
            className="not-italic leading-[24px]
                       xl:py-[17px] xl:px-[19px] xl:text-[20px] 
                       2xl:px-[34px] 2xl:py-[38px] 2xl:text-[40px]"
          >
            stop stalking me 🙈
          </p>
        </div>
      </div>
    </>
  );
};

export default DashBoardAbout;
