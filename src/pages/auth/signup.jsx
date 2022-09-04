import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import BTN_CLASS from '../../globalVars/btn_class'

const SignUp = () => {
  const [data, setData] = useState({})
  const [date, setDate] = useState({})
  const [dateErrorMessage, setDateErrorMessage] = useState({})
  const [test, setTest] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleInput = (e, input) => {
    setData({
      ...data,
      [input]: e.target.value
    })
  }

  const handleDateInput = (e, input) => {
    const currentDate = new Date()
    const currentYear = moment(currentDate).format('Y')

    if (input === 'day') {
      if (parseInt(e.target.value) <= 31 && parseInt(e.target.value) > 0) {
        setDate({ ...date, day: e.target.value })
        setDateErrorMessage({
          ...dateErrorMessage,
          day: ''
        })
      } else {
        setDateErrorMessage({
          ...dateErrorMessage,
          day: 'Please enter valid day'
        })
      }
    } else if (input === 'month') {
      if (parseInt(e.target.value) <= 12 && parseInt(e.target.value) > 0) {
        setDate({ ...date, month: e.target.value })
        setDateErrorMessage({
          ...dateErrorMessage,
          month: ''
        })
      } else {
        setDateErrorMessage({
          ...dateErrorMessage,
          month: 'Please enter valid month'
        })
      }
    } else if (input === 'year') {
      if (parseInt(e.target.value) <= currentYear && parseInt(e.target.value) > currentYear - 100) {
        setDate({ ...date, year: e.target.value })
        setDateErrorMessage({
          ...dateErrorMessage,
          year: ''
        })
      } else {
        setDateErrorMessage({
          ...dateErrorMessage,
          year: 'Please enter valid year'
        })
      }
    }
  }

  const handleSubmit = () => {
    const jsonData = JSON.stringify(data)
    console.log('data ', data)
    console.log('JSON data ', jsonData)


    axios.post('http://localhost:3000/api/auth/signup', jsonData)
        .then(() => router.push('/'))
        .catch((err) => {
          setErrorMessage(Object.values(err.response.data)[0])
    })
  }
  useEffect(() => {
    // Validate that the date entered isn't the future date
    if (date?.day && date?.month && date?.year) {
      const currentDate = new Date()
      const birthDate = new Date(date.year, parseInt(date.month) - 1, date.day)

      const currentDateInt = moment(currentDate).format('Y')
      + moment(currentDate).format('MM')
      + moment(currentDate).format('DD')

      const inputDateInt = moment(birthDate).format('Y')
      + moment(birthDate).format('MM')
      + moment(birthDate).format('DD')

      if ((currentDateInt - inputDateInt) < 0) {
        setDateErrorMessage({ day: 'Date can\'t be a future date' })
      } else {
        setDateErrorMessage({ day: '' })
        setData({
          ...data,
          dateOfBirth: `${date.year},${date.month} ${date.day}`
        })
      }
    }
  }, [date])

  return (
    <div className="w-full">
      <div className="flex flex-col hero w-full">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full max-w-xs rounded-md bg-zinc-1000 border border-zinc-700 m-1"
          onChange={(e, input) => handleInput(e, 'name')}
        />

        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-80 rounded-md bg-zinc-1000 border border-zinc-700 m-1"
          onChange={(e, input) => handleInput(e, 'email')}
        />

        <label className="flex flex-row w-80 space-between m-1">
          <input
            type="text"
            placeholder="Day"
            className="input input-bordered w-1/3 rounded-md bg-zinc-1000 border border-zinc-700"
            onChange={(e, input) => handleDateInput(e, 'day')}
          />
          <input
            type="text"
            placeholder="Month"
            className="input input-bordered w-1/3 rounded-md bg-zinc-1000 border border-zinc-700 mx-2"
            onChange={(e, input) => handleDateInput(e, 'month')}
          />

          <input
            type="text"
            placeholder="Year"
            className="input input-bordered w-1/3 rounded-md bg-zinc-1000 border border-zinc-700"
            onChange={(e, input) => handleDateInput(e, 'year')}
          />
        </label>

        <div className="text-sm text-red-600">
          { dateErrorMessage.day }
        </div>
        <div className="text-sm text-red-600">
          { dateErrorMessage.month }
        </div>
        <div className="text-sm text-red-600 mb-5">
          { dateErrorMessage.year }
        </div>

        <input
          type="password"
          placeholder="Password Confirmation"
          className="input input-bordered w-80 rounded-md bg-zinc-1000 border border-zinc-700 m-1"
          onChange={(e, input) => handleInput(e, 'passwordConfirmation')}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-80 rounded-md bg-zinc-1000 border border-zinc-700 m-1 "
          onChange={(e, input) => handleInput(e, 'password')}
        />

        <div className="text-sm text-red-600 mb-5">
          { errorMessage }
        </div>
        <div className={BTN_CLASS.dark} onClick={() => handleSubmit()}>
          Login
        </div>
      </div>
    </div>
  )
}

export default SignUp
