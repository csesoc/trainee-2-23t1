import React, { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";
import TideProfile from "./TideProfile";
import { TInvited } from "../../../pages/meeting_arrangement/Arrange";


const TideSearch: React.FC<{
  searchQuery: string,
  handleAddInvited: (invited: TInvited) => void,
}> = (props) => {

  const [dataFetched, setDataFetched] = useState(false);
  const [res, setRes] = useState<TInvited[]>([]);

  const userToken = localStorage.getItem("token");
  if (typeof userToken === 'undefined' || userToken === null) {

  }
  const retrieveEndpoint = trpc.search.searchFriends.useQuery({
    queryStr: props.searchQuery
  })
  
  useEffect(() => {
    if (dataFetched && retrieveEndpoint.isSuccess) {
      console.log(retrieveEndpoint.data)
      setRes(retrieveEndpoint.data.map(d => {
        return {uId: d.id, email: d.email, name: d.name} as TInvited
      }))
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
          <div>No matches exist.</div> :
          res.map(r => {
            return (
              <TideProfile key={r.uId} person={r} handleClick={props.handleAddInvited} added={false} />
            )
          })
      }
    </div>
  )
}


export default TideSearch