import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchResult from "../components/Search/SearchResult";
import { useParams } from "react-router-dom";
import { trpc } from "../utils/trpc";

const SearchPage: React.FC<{darkMode: boolean, handleToggleDark: any}> = (props) => {

  const { query } = useParams();
  const [dataFetched, setDataFetched] = useState(false);
  const [res, setRes] = useState<JSX.Element[]>([]);

  const userToken = localStorage.getItem("token");
  if (typeof userToken === 'undefined' || userToken === null) {

  }
  const retrieveEndpoint = trpc.search.search.useQuery({
    token: userToken as string,
    queryStr: query as string
  });

  useEffect(() => {
    if (retrieveEndpoint.isSuccess && dataFetched) {
      console.log(retrieveEndpoint.data.users)
      const searchResults = retrieveEndpoint.data.users.map(item => {
        return <SearchResult name={item.name} email={item.email} aboutMe={item.aboutMe}/>
      })
      setRes(searchResults)
    }
  }, [retrieveEndpoint.isSuccess, dataFetched])
  
  if (retrieveEndpoint.isSuccess && !dataFetched) {
    setDataFetched(true);
  }
  
  return (
    <div className={props.darkMode ? "dark" : "light"}>
      <div className="dark:bg-black dark:text-white h-screen text-black">
        <Navbar handleToggleDark={props.handleToggleDark}/>
        <h1 className="text-xl font-semibold px-20 py-10">Search results for "{query}"</h1>
        <div className="flex flex-col items-center px-20 justify-center">
          {res}
        </div>
      </div>
    </div>
  )
}

export default SearchPage;