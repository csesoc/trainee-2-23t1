import React from "react";

const UserProfileButton: React.FC = () => {
  return (
    <>
      <button
        className="bg-navbar hover:bg-blue-950 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl
                           lg:w-[242px] lg:h-[49px] lg:mt-[80px]
                            md:w-[140px] md:h-[30px] md:mt-[20px]"
      >
        <p className="lg:text-lg md:text-sm lg:leading-[24px] md:leading-[14px]">
          See Calendar
        </p>
      </button>
    </>
  );
};

export default UserProfileButton;
