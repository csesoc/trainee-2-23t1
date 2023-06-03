import React, { useEffect, useState } from "react";
import UserProfileInfoCard from "./UserProfileInfoCard";
import UserProfileButton from "./UserProfileButton";
import UserProfileDetailCard from "./UserProfileDetailCard";
import { trpc } from "../../utils/trpc";

const UserProfileLayout: React.FC = () => {
  const [userStatus, setUserStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userDOB, setUserDOB] = useState("");
  const [userDegree, setUserDegree] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  // retrieve user data
  const userToken = localStorage.getItem("token");
  if (typeof userToken === 'undefined' || userToken === null) {

  }
  const retrieveEndpoint = trpc.user.getUserProfile.useQuery({
    token: userToken as string
  },{
    staleTime: Infinity
  });

  useEffect(() => {
    if (retrieveEndpoint.isSuccess && dataFetched) {
      setUserStatus(retrieveEndpoint.data.status);
      setUserName(retrieveEndpoint.data.name);
      setUserEmail(retrieveEndpoint.data.email);
      setUserDOB(retrieveEndpoint.data.dob.split("T")[0]);
      setUserDegree(retrieveEndpoint.data.degree);
      setUserPhone(retrieveEndpoint.data.phone);
      setUserAbout(retrieveEndpoint.data.aboutMe);
    }
  }, [retrieveEndpoint.isSuccess, dataFetched])

  if (retrieveEndpoint.isSuccess && !dataFetched) {
    setDataFetched(true);
    console.log("Hehe")
  }

  return (
    <>
      <div className="bg-gray-300/20 flex items-center justify-center h-screen">
        <div className="h-screen w-screen flex flex-row items-center justify-evenly">
          <div className="flex flex-col items-center justify-between">     
            <div
              className="bg-white rounded-3xl shadow-lg text-black flex flex-col items-center
                        lg:w-[400px] lg:h-[469px]
                        md:w-[190.5px] md:h-[277.5px]"
            >
              <UserProfileInfoCard userName={userName} userEmail={userEmail} />
            </div>
              <UserProfileButton />
          </div>
          <UserProfileDetailCard
            userName={userName} userStatus={userStatus} userDOB={userDOB}
            userDegree={userDegree} userPhone={userPhone} userAbout={userAbout}
            />
        </div>
      </div>
    </>
  );
};

export default UserProfileLayout;
