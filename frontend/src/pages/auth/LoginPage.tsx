import React, { EventHandler, FormEvent, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../../utils/trpc";

const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  const loginFnc = trpc.auth.login.useMutation()

  const login: EventHandler<FormEvent> = useCallback((event) => {
    event.preventDefault()

    const formInput: any = event.target
    loginFnc.mutate({
      email: formInput.email.value,
      password: formInput.password.value,
    }, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token)
        navigate('/')
      },
      onError: (error, variables, context) => {
        alert(error.message)
        console.log(error)
        console.log(variables)
        console.log(context)
      }
    })
  }, [])

  return (
    <div className="text-black p-5">
      <h1>Login</h1>
      <form onSubmit={login}>
        <div className="m-2 ml-0">
          <label className="mr-5">Email</label>
          <input name="email" type={"text"} className="border-black border-2" />
        </div>
        <div className="m-2 ml-0">
          <label className="mr-5">Password</label>
          <input name="password" type={"text"} className="border-black border-2" />
        </div>
        <button type="submit" className="bg-gray-800 text-white p-2">
          submit
        </button>
      </form>
      <Link className="text-blue-700" to="/register"> No account? Register!</Link>
    </div>
  )
}

export default LoginPage
