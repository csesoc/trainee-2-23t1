import React from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import LockResetIcon from '@mui/icons-material/LockReset';
// import { IconButton } from "@mui/material";

const UserProfileInfoCard: React.FC = () => {
  return (
    <>
        <img
          className="rounded-full 
                     lg:mt-[40px] lg:h-[140px]
                     md:mt-[22.5px] md:h-[90px]"
          src="../../../public/profile.jpeg"
          alt="profile"
        />
        <p
          className="not-italic font-semibold leading-9
                     lg:mt-[22px] lg:text-[40px]
                     md:mt-[13.5px] md:text-[22.5px]"
        >
          Mark Tran
        </p>
        <p
          className="not-italic font-normal leading-[22px] opacity-70 
                      lg:mt-[22px] lg:text-[20px]
                      md:mt-[13.5px] md:text-[11.25px]"
        >
          marktran873@gmail.com
        </p>
        <hr
          className="border-1 border-black w-[80%] opacity-30
                      lg:my-6"
        />
        <div className="flex flex-row items-center justify-between">
          <p
            className="not-italic font-normal leading-[19px] tracking-[-0.02em]
                       lg:text-[22px] lg:pr-[10px]
                       md:text-xs md:pr-[7.5px]"
          >
            Edit Profile
          </p>
          {/* <IconButton aria-label="delete" size="small">
            <EditOutlinedIcon />
          </IconButton> */}
        </div>
        <hr
          className="border-1 border-black w-[80%] opacity-30
                      lg:my-6"
        />
        <div className="flex flex-row items-center justify-between">
          <p
            className="not-italic font-normal leading-[19px] tracking-[-0.02em]
                       lg:text-[22px] lg:pr-[10px]
                       md:text-xs md:pr-[7.5px]"
          >
            Edit Password
          </p>
          {/* <IconButton aria-label="delete" size="small">
            <LockResetIcon />
          </IconButton> */}
        </div>
    </>
  );
};

export default UserProfileInfoCard;
