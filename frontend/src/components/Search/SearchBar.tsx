import React, { EventHandler, FormEvent, useCallback, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {

  const navigate = useNavigate();

  const submitFnc: EventHandler<FormEvent> = useCallback((event) => {
    event.preventDefault()
    
    const formInput: any = event.target
    navigate('/search/' + formInput.queryStr.value)
    window.location.reload()
  }, [])

  
  return (
    <div>
      <form onSubmit={submitFnc} className="px-20 items-center">
        <label>
          <input
            name="queryStr"
            placeholder="🔎 Search Waves" 
            type="text" 
            autoComplete="off"
            className="w-56 outline-none text-white py-2 px-4 rounded-xl bg-gray-900/50 focus:bg-gray-900 focus:w-[650px] transition-all delay-200 transform ease-in-out"
          ></input>
        </label>
      </form>
    </div>
  )
}

export default SearchBar