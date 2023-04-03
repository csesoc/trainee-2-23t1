import React, { EventHandler, FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import EyeIcon from "./EyeIcon";
import EyeSlashIcon from "./EyeSlashIcon";

const AuthCard: React.FC<{isLogin: boolean}> = ({ isLogin }) => {
  const navigate = useNavigate()

  const [showPword, setShowPword] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const submitEndpoint: any = isLogin ? trpc.auth.login.useMutation() : trpc.auth.register.useMutation()

  const submitFnc: EventHandler<FormEvent> = useCallback((event) => {
    event.preventDefault()

    const formInput: any = event.target

    submitEndpoint.mutate({
      email: formInput.email.value,
      password: formInput.password.value,
      name: formInput.name.value
    }, {
      onSuccess: (data: any) => {
        localStorage.setItem("token", data.token)
        navigate('/')
      },
      onError: (error: any) => {
        setErrMsg(error.message)
        console.log(error)
      }
    })
  }, [])

  return (
    <div className="text-black p-5 flex flex-col place-items-center justify-center h-screen">
      <div className="flex flex-col gap-10 w-[50%]">
        <h1 className="text-5xl">👋 🌊</h1>
        <h1 className="text-5xl mb-16">{isLogin ? "Login" : "Sign up to Waves"}</h1>
        <form onSubmit={submitFnc} className="flex flex-col gap-16">

          {!isLogin && <input name="name" type={"text"} placeholder="Full Name" 
            className="border-black border-b-[1px] py-2 focus:outline-none" />}

          <input name="email" type={"text"} placeholder="Email Address" 
            className="border-black border-b-[1px] py-2 focus:outline-none" />

          <div className="border-black border-b-[1px] py-2 flex">
            <input name="password" type={showPword ? "text" : "password"} placeholder="Password" className="w-full focus:outline-none"/>
            <button type="button" onClick={() => setShowPword(!showPword)} className="border-0 mx-2">
              {showPword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          
          {errMsg !== '' && <div className="text-red-600 text-sm -my-10">{errMsg}</div>}

          <button type="submit" className="bg-green-950 text-white font-bold p-2 rounded-lg mt-14">
            Continue
          </button>
        </form>

        <div className="place-self-center text-gray-600">
          {isLogin ? "Dont't have an account?" : "Already have an account?"} &nbsp;
          <Link className="text-green-700" to={isLogin ? "/register" : "/login"}> 
            {isLogin ? "Sign up!" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthCard
