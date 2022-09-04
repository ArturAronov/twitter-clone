import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'

import BTN_CLASS from '../../globalVars/btn_class'

const Login = () => {
  const [data, setData] = useState({})
  const [errorMessage, setErrorMessage] = useState({})
  const router = useRouter()
  const handleInput = (e, input) => {
    setData({
      ...data,
      [input]: e.target.value
    })
  }

  const handleSubmit = () => axios.post('/api/auth/login', data)
    .then(() => router.push('/'))
    .catch((err) => {
      if (err?.response?.data?.email) {
        setErrorMessage({
          ...errorMessage,
          email: err.response.data.email
        })
      } else if (err?.response?.data?.password) {
        setErrorMessage({
          ...errorMessage,
          password: err.response.data.password
        })
      }
    })

  return (
    <div className="w-full">

      <div className="flex flex-col hero w-full">
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs rounded-md bg-zinc-1000 border border-zinc-700 m-1"
          onChange={(e, input) => handleInput(e, 'email')}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs rounded-md bg-zinc-1000 border border-zinc-700 m-1 "
          onChange={(e, input) => handleInput(e, 'password')}
        />
        <div className="text-sm text-red-600">
          { errorMessage?.email && errorMessage.email }
        </div>
        <div className="text-sm text-red-600 mb-5">
          { errorMessage?.password && errorMessage.password }
        </div>
        <div className={BTN_CLASS.dark} onClick={() => handleSubmit()}>
          Login
        </div>
      </div>
    </div>
  )
}

export default Login
