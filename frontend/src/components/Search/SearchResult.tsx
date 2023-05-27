import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

const SearchResult: React.FC<{
  name: string,
  email: string,
  aboutMe: string,
  following: boolean
}> = (props) => {

  const [following, setFollowing] = useState(props.following)

  const clickEndpoint = trpc.follow.follow.useMutation()
  const handleFollowButtonClick = () => {
    const userToken = localStorage.getItem("token");
    
    if (typeof userToken === 'undefined' || userToken === null) {
      return;
    }
    clickEndpoint.mutate({
      token: userToken,
      usrEmail: props.email
    }, {
      onSuccess: (data: any) => {
        console.log(data.following)
        setFollowing(data.following)
      },
      onError: (error: any) => {
        window.alert(error.message)
      },
    })
  }

  return (
    <div className="my-3 flex flex-row items-center justify-center border-gray-400/20 rounded-lg w-10/12 transition duration-150 cursor-pointer">
    <div className="m-auto">
      <div className="flex flex-row items-center justify-evenly">
        <img 
          src="../../../public/anya.jpeg"
          className="h-24 w-24 rounded-full object-cover my-2 mx-10"
        ></img>
        <div className="flex flex-col w-80">
          <h1 className="text-lg font-semibold">{props.name}</h1>
          <p className="text-sm font-light">{props.email}</p>
          <p className="text-sm font-light pt-2">{props.aboutMe}</p>
        </div>
      </div>
    </div>
    <div className="flex m-auto">
        <button onClick={handleFollowButtonClick} className={following ? "rounded-full py-2 px-8 bg-gray-500 hover:border-0 text-white dark:text-darkWhite transition duration-150 ease-linear" : "rounded-full py-2 border-[1px] border-gray-300 px-10 hover:bg-blue-500 hover:border-0 hover:text-white transition duration-150 ease-linear"}>
          {following ? "- Unfollow" : "+ Follow"}
        </button>
    </div>
    </div>
  )
}


export default SearchResult