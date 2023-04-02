import React from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../../public/vite.svg"
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { Navigate } from "react-router-dom";

const Placeholder: React.FC = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />
  }

  const [count, setCount] = useState(0);

  const hello = trpc.hello.helloWorld.useQuery(undefined, {
    onError: (error) => {
      alert(error)
      console.log(error.message)
    }
  })

  if (hello.isFetched) {
    console.log(hello.data)
  }

  return (
    <div className="flex flex-col justify-center place-items-center min-h-screen gap-8 bg-[#242424]">
      <div className="flex gap-10">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} 
            className="h-[150px] aspect-square animate-spin-slow hover:hover-backdrop" alt="React logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="h-[150px] aspect-square animate-spin-slow hover:hover-backdrop" alt="React logo" />
        </a>
      </div>
      <h1 className="text-6xl font-bold">Vite + React</h1>
      <div className="flex flex-col place-items-center">
        <button 
          className="
            bg-[#2f2f2f] 
            w-[100px] 
            p-1 
            rounded-md 
            hover:bg-[#2c2c2c]
            active:bg-[#222]
          " 
          onClick={() => setCount((count) => count + 1)}>
            count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-[#888]">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default Placeholder;
