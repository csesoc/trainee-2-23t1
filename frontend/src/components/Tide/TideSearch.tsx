import React, { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import TideProfile from "./TideProfile";


const TideSearch: React.FC<{
  searchQuery: string,
  handleAddInvited: any
}> = (props) => {

  const [dataFetched, setDataFetched] = useState(false);
  const [res, setRes] = useState<JSX.Element[]>([]);

  const userToken = localStorage.getItem("token");
  if (typeof userToken === 'undefined' || userToken === null) {

  }
  const retrieveEndpoint = trpc.search.searchFriends.useQuery({
    token: userToken as string,
    queryStr: props.searchQuery
  })
  
  useEffect(() => {
    if (dataFetched && retrieveEndpoint.isSuccess) {
      console.log(retrieveEndpoint.data.users)
      const tempElems = retrieveEndpoint.data.users.map(item => <TideProfile name={item.name} email={item.email} handleClick={props.handleAddInvited} added={false}/>)
      setRes(tempElems)
      setDataFetched(prev => !prev)
    }
  }, [retrieveEndpoint.isSuccess, dataFetched])
  
  if (retrieveEndpoint.isSuccess && !dataFetched) {
    setDataFetched(prev => !prev);
  }


  return (
    <div className="flex flex-row flex-wrap">
      {
        res.length === 0 ? 
        <div>No matches exist.</div>
        :
        res
      }
    </div>
  )
}


export default TideSearch