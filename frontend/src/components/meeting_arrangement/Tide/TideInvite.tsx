import React, { EventHandler, FormEvent, useCallback, useEffect, useState } from "react";
import TideSearch from "./TideSearch";


const TideInvite: React.FC<{
  handleAddInvited: any
}> = (props) => {

  const [searchQuery, setSearchQuery] = useState<string>("");

  const userToken = localStorage.getItem("token");
  if (typeof userToken === 'undefined' || userToken === null) {

  }
  
  const submitFnc: EventHandler<FormEvent> = useCallback((event) => {
    event.preventDefault()
    const formInput: any = event.target
    const inputVal = formInput.queryStr.value
    setSearchQuery(inputVal)
  }, [])

  const handleInputChange: EventHandler<FormEvent> = useCallback((event: any) => {
    if (event.target.value.length === 0) {
      setSearchQuery("")
    }
  }, [])

  return (
    <div className="text-black dark:text-darkWhite">
      <h1 className="text-2xl font-medium py-5">
        Get others to ride the wave 🌊
      </h1>
      <p className="font-light">
        Add members to the new event
      </p>
      <form onSubmit={submitFnc} className="py-6">
        <input
          name="queryStr"
          placeholder="🔎 Search"
          type="text"
          autoComplete="off"
          className="w-80 border-2 border-black py-2 px-5 rounded-full text-black/80"
          onChange={handleInputChange}
        ></input>
      </form>
      <TideSearch searchQuery={searchQuery} handleAddInvited={props.handleAddInvited} />
    </div>
  )
}


export default TideInvite