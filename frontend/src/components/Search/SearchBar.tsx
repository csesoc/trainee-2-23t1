import React, { EventHandler, FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC<{focused: boolean, setFocus: any}> = ({ focused, setFocus }) => {
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
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`${focused ? "w-[650px]" : "w-56"}
              outline-none 
              text-white 
              py-2 
              px-4 
              rounded-xl 
              bg-gray-900/50 
              focus:bg-gray-900 
              transition-all 
              transform 
              ease-in-out
              duration-300
            `}
          ></input>
        </label>
      </form>
    </div>
  )
}

export default SearchBar