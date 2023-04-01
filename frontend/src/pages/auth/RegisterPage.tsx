import React, { EventHandler, FormEvent, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../../utils/trpc";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()

  const regFnc = trpc.auth.register.useMutation()

  const register: EventHandler<FormEvent> = useCallback((event) => {
    event.preventDefault()

    const formInput: any = event.target
    regFnc.mutate({
      name: formInput.username.value,
      email: formInput.email.value,
      handle: formInput.handle.value,
      password: formInput.password.value,
    }, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token)
        navigate("/")
      },
      onError: (error, variables, context) => {
        alert(error.message)
        console.log(error)
        console.log(variables)
        console.log(context)
      },
    })
  }, [])

  return (
    <div className="text-black m-5">
      <h1>Register</h1>
      <form onSubmit={register}>
        <div className="m-2 ml-0">
          <label className="mr-5">Name</label>
          <input name="username" type={"text"} className="border-black border-2" />
        </div>
        <div className="m-2 ml-0">
          <label className="mr-5">Email</label>
          <input name="email" type={"text"} className="border-black border-2" />
        </div>
        <div className="m-2 ml-0">
          <label className="mr-5">User handle</label>
          <input name="handle" type={"text"} className="border-black border-2" />
        </div>
        <div className="m-2 ml-0">
          <label className="mr-5">Password</label>
          <input name="password" type={"text"} className="border-black border-2" />
        </div>
        <button type="submit" className="bg-gray-800 text-white p-2">
          submit
        </button>
      </form>
      <Link className="text-blue-700" to="/login"> Have an account? Login!</Link>
    </div>
  )
}

export default RegisterPage
