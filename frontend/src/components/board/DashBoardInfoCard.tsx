import React from "react";

const DashBoardInfoCard: React.FC = () => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  console.log(windowHeight + " " + windowWidth);
  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg flex flex-col items-center text-black
                      xl:ml-[130px] xl:mt-[150  px] xl:w-[254px] xl:h-[369px]
                      2xl:ml-[260px] 2xl:mt-[300px] 2xl:w-[508px] 2xl:h-[738px]">
        <img
          className="rounded-full 
                     xl:mt-[30px] xl:h-[120px]
                     2xl:mt-[60px] 2xl:h-[240px]"
          src="../../../public/profile.jpeg"
          alt="profile"
        />
        <p
          className="not-italic font-semibold leading-9
                     xl:mt-[18px] xl:text-[30px]
                     2xl:mt-[36px] 2xl:text-[60px]"
        >
          Mark Tran
        </p>
        <p
          className="not-italic font-normal leading-[18px] opacity-70 
                      xl:mt-[18px] xl:text-[15px] 
                      2xl:mt-[36px] 2xl:text-[30px] 2xl:pb-[28px]"
        >
          marktran873@gmail.com
        </p>
        <hr className="my-4 border-1 border-black w-[80%] opacity-30" />
        <p
          className="not-italic font-normal leading-[19px] tracking-[-0.02em]
                     xl:text-base
                     2xl:mt-[28px] 2xl:text-[32px] 2xl:pb-[28px]"
        >
          💀 Conducting rizzearch
        </p>
        <hr className="my-4 border-1 border-black w-[80%] opacity-30" />
        <div className="flex flex-row items-center justify-between">
          <p
            className="pr-[10px] not-italic font-normal leading-[19px] tracking-[-0.02em]
                       xl:text-base
                       2xl:mt-[28px] 2xl:text-[32px]"
          >
            Advanced Settings
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="xl:w-[20px] xl:h-[20px]
                       2xl:mt-[28px] 2xl:w-[40px] 2xl:h-[40px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default DashBoardInfoCard;
