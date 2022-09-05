import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import BTN_CLASS from '../../../globalVars/btn_class'

const SettingsPassword = () => {
  const [submitData, setSubmitData] = useState({})
  const [errorMessage, setErrorMessage] = useState()
  const router = useRouter()

  const handleInput = (e, input) => {
    setSubmitData({
      ...submitData,
      [input]: e.target.value
    })
  }



  const handleSubmit = () => {
    let submitFormData = new FormData()

    for (let i in submitData) {
      submitFormData.append(i, submitData[i])
    }

    axios.put('/api/my/profile/update', submitFormData)
      .then(() => router.push('/settings'))
      .catch((err) => {
        setErrorMessage(Object.values(err.response.data)[0])
      })
  }

  return (
    <div className="w-full mt-10">
      <div className="flex flex-col hero w-full">
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs rounded-md bg-zinc-1000 border border-zinc-700 m-1 "
          onChange={(e, input) => handleInput(e, 'password')}
        />
        <input
          type="password"
          placeholder="Password Confirmation"
          className="input input-bordered w-full max-w-xs rounded-md bg-zinc-1000 border border-zinc-700 m-1 "
          onChange={(e, input) => handleInput(e, 'passwordConfirmation')}
        />
        <div className="text-center text-red-600 text-sm mb-5">
          { errorMessage }
        </div>
        <div className={BTN_CLASS.dark} onClick={() => handleSubmit()}>
          Login
        </div>
      </div>
    </div>
  )
}

export default SettingsPassword
