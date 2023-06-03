import React from "react";
import { trpc } from "../../utils/trpc";

const DashBoardAbout: React.FC = () => {
  const selfId = localStorage.getItem("token");
  if (typeof selfId === 'undefined' || selfId === null) {}
  const getUserProfileAPI = trpc.user.getUserProfile.useQuery({
    token: selfId as string
  },{
    staleTime: Infinity
  });
  
  return (
    <>
      <div className="text-black"
                      >
        <p
          className="not-italic font-semibold leading-[24px]
                     mt-[30px] text-[25px]"
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
                       lg:py-[17px] lg:px-[19px]
                       md:py-[12.75px] md:px-[14.25px] text-[15px]"
          >
            {getUserProfileAPI.data?.aboutMe}
          </p>
        </div>
      </div>
    </>
  );
};

export default DashBoardAbout;
