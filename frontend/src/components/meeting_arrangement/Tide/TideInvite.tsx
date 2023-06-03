import React, { useCallback, useState } from "react";
import TideSearch from "./TideSearch";


const TideInvite: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleInputChange = useCallback((event: any) => {
    setSearchQuery(event.currentTarget.value)
  }, [])

  return (
    <div className="text-black dark:text-darkWhite">
      <h1 className="text-2xl font-medium py-5">
        Get others to ride the wave 🌊
      </h1>
      <p className="font-light">
        Add members to the new event
      </p>
      <input
        name="queryStr"
        placeholder="🔎 Search"
        type="text"
        autoComplete="off"
        className="w-80 border-2 border-black py-2 my-6 px-5 rounded-full text-black/80"
        onChange={handleInputChange}
      />
      <TideSearch searchQuery={searchQuery} />
    </div>
  )
}


export default TideInvite