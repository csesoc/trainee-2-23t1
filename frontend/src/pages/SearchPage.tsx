import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchResult from "../components/Search/SearchResult";
import { useParams } from "react-router-dom";
import { trpc } from "../utils/trpc";
import ChainIcon from "../assets/Icons/ChainIcon";

const SearchPage: React.FC = () => {

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
        // the friends method of seeing who you already follow can be better on backend
        return <SearchResult name={item.name} email={item.email} aboutMe={item.aboutMe} following={item.following}/>
      })
      setRes(searchResults)
    }
  }, [retrieveEndpoint.isSuccess, dataFetched])
  
  if (retrieveEndpoint.isSuccess && !dataFetched) {
    setDataFetched(true);
  }
  
  return (
    <div className="dark:bg-black dark:text-darkWhite h-screen text-black">
      <h1 className="text-xl font-semibold px-20 py-10">Search results for "{query}"</h1>
      <div className="flex flex-col items-center px-20 justify-center">
        {
          res.length > 0 
            ? 
          res
            : 
          <div>
            <ChainIcon />
            <h2 className="text-xl font-medium py-3">Your search did not match any results</h2>
            <p className="text-md opacity-60">Make sure that everything is spelt correctly or try different keywords</p>
          </div>
        }
      </div>
    </div>
  )
}

export default SearchPage;