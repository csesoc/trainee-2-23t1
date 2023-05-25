import React from "react";

const SearchResult: React.FC<{
  name: string,
  email: string,
  aboutMe: string
}> = (props) => {

  return (
    <div className="my-3 flex flex-row items-center justify-center border-2 border-gray-400/20 rounded-lg w-10/12 hover:bg-gray-200/90 transition duration-150 cursor-pointer">
    <div>
      <div className="flex flex-row items-center justify-evenly w-[30%]">
        <img 
          src="../../../public/anya.jpeg"
          className="h-24 w-24 rounded-full object-cover mx-10 my-3"
        ></img>
        <div className="flex flex-col pr-3">
          <h1 className="text-lg font-semibold">{props.name}</h1>
          <p className="text-sm font-light">{props.email}</p>
          <p className="text-sm font-light pt-2">{props.aboutMe}</p>
        </div>
      </div>  
    </div>
    <div className="flex justify-end">
        <button className="rounded-xl border-2 border-gray-500 px-10">
          Follow
        </button>
    </div>
    </div>
  )
}


export default SearchResult