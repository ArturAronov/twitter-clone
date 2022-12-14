import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import useProfile from '../../../hooks/useProfile'
import HeaderImgSM from '../../../components/profile/HeaderImg'
import CameraBtn from '../../../components/buttons/CameraBtn'

import TweetLengthProgress from '../../../components/tweet/TweetLengthProgress'

import BTN_CLASS from '../../../globalVars/btn_class'

const SettingsAccount = () => {
  const [bio, setBio] = useState('')
  const [percent, setPercent] = useState(0)
  const [city, setCity] = useState('')
  const [citiesAPI, setCitiesAPI] = useState([])
  const [selectedCityCountry, setSelectedCityCountry] = useState({})
  const [submitData, setSubmitData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [headerImage, setHeaderImage] = useState()

  const { profile, newProfile } = useProfile()
  const router = useRouter()

  const handleImgUpload = (img, key) => {
    const imgSubmitData = new FormData()

    imgSubmitData.append(key, img.target.files[0])
    return axios.put('/api/my/profile/update', imgSubmitData)
      .then(() => router.push('/settings/account')).then(() => newProfile())
  }

  const handleBioInput = (e) => {
    if (e.target.value.length < 280) {
      setBio(e.target.value)
    }

    // This changes the height of the textarea box.
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const handleSubmit = () => {
    let submitFormData = new FormData()

    for (let i in submitData) {
      submitFormData.append(i, submitData[i])
    }

    return axios.put('/api/my/profile/update', submitFormData)
      .then(() => router.push('/settings'))
      .catch((err) => {
        setErrorMessage(Object.values(Object.values(err.response.data)[0]))
      })
  }

  const handleChanges = (e, key) => {
    setSubmitData({
      ...submitData,
      [key]: e.target.value
    })
  }

  useEffect(() => {
    // Should user select city and country, and type the new value again, the selectedCityCountry object gets reset
    selectedCityCountry?.city && setSelectedCityCountry({})
  }, [city])

  useEffect(() => {
    profile?.id
    && setSubmitData({
      ...submitData,
      location: selectedCityCountry?.city && `${selectedCityCountry.city} (${selectedCityCountry.country})` || city || profile.location || null
    })

    setPercent((bio.length * 100) / 280)

    const options = {
      method: 'GET',
      url: 'https://spott.p.rapidapi.com/places/autocomplete',
      params: { limit: '10', skip: '0', q: city, type: 'CITY' },
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_GEOLOCATION_API,
        'X-RapidAPI-Host': 'spott.p.rapidapi.com'
      }
    }

    if(city.length >= 3) {
        axios.request(options).then((res) => {
        setCitiesAPI(res.data)
      })
    }

    if(profile?.headerImg) {
      setHeaderImage(<HeaderImgSM headerImg={profile.headerImg} />)
    } else {
      setHeaderImage(<div className='h-[200px] w-3/4 bg-zinc-800'></div>)
    }


  }, [bio, city, selectedCityCountry, profile])

  return (
    <>
      {

        profile?.id
        && (
          <div className="w-full flex flex-col justify-center mb-5 static overflow-hidden">
            <div className="flex justify-center mt-5 lg:mt-10 static">
              <div className="w-3/4 flex justify-center backdrop-opacity-100 static max-h-[200px] object-cover">
                <label
                  className="h-full w-full hero-content backdrop-opacity-10 fixed static"
                  onChange={(img) => handleImgUpload(img, 'headerImg')}
                >
                  <CameraBtn />
                  <input className="hidden" type="file" />
                </label>
                {headerImage}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-3/4 h-[40px] sm:h-[55px] flex backdrop-opacity-100">
                <div className="flex flex-row justify-between pl-2.5 -mt-16 items-end relative">
                  <div>
                    <img src={profile.avatarImg} className="w-20 sm:w-28 h-20 sm:h-28 object-cover rounded-full border-4 border-zinc-1000" />
                    <label
                      className="fixed -top-8 left-8 sm:left-11"
                      onChange={(img) => handleImgUpload(img, 'avatarImg')}
                    >
                      <CameraBtn />
                      <input className="hidden" type="file" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col hero-content mt-5">
              <div className='w-80 mt-2'>
                <label className="label flex flex-row w-content">
                  <span className="label-text text-sm text-zinc-500 pl-1">Username
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs rounded-md bg-zinc-1000 border border-zinc-700 m-1 text-zinc-0"
                  onChange={(e, userName) => handleChanges(e, 'userName')}
                />
              </div>
              <div className='w-80 mt-2'>
                <label className="label flex flex-row w-content">
                  <span className="label-text text-sm text-zinc-500 pl-1">Website
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs rounded-md bg-zinc-1000 border border-zinc-700 m-1 text-zinc-0"
                  onChange={(e, website) => handleChanges(e, 'website')}
                />
              </div>
              <label className="label w-80 mt-2 ">
                <span className="label-text text-sm text-zinc-500 pl-1">Bio
                </span>
              </label>
              <div className="w-80 max-w-xs m-1 ml-3 flex flex-row hero-content">
                <textarea
                  value={bio}
                  className="textarea w-full max-w-xs bg-zinc-1000 overflow-hidden h-full text-zinc-0 border border-zinc-700 rounded-md"
                  onChange={(e, bio) => {
                    handleBioInput(e)
                    handleChanges(e, 'bio')
                  }}
                />
                {bio.length > 0 && <TweetLengthProgress percent={percent} />}
              </div>
              <div className="w-80 m-1 mt-2">
                <label className="label flex flex-row w-content">
                  <span className="label-text text-sm text-zinc-500 pl-1">Location
                  </span>
                </label>
                <div className="dropdown">
                  <input
                    tabIndex="0"
                    type="text"
                    value={selectedCityCountry?.city ? `${selectedCityCountry.city} (${selectedCityCountry.country})` : city}
                    className="input input-bordered w-80 rounded-md bg-zinc-1000 border border-zinc-700 m-1 text-zinc-0"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {
                  city.length >= 3
                  && (
                  <ul className="dropdown-content menu px-3 shadow bg-base-100 rounded-box w-52 text-sm text-zinc-600 w-80" tabIndex="0">
                    {
                      citiesAPI.map((element) => (
                        <li
                          key={element.country.name + element.name}
                          className="cursor-pointer p-2 bg-zinc-900 hover:bg-zinc-800 w-[300px]"
                          onClick={() => {
                            setSelectedCityCountry({
                              city: element.name,
                              country: element.country.name
                            })
                          }}
                        >
                          { element.name } ({element.country.name})
                        </li>
                      ))
                    }
                  </ul>
                  )
                }
                </div>
              </div>
            </div>
            <div className="text-red-600 text-sm text-center mb-3 mt-1">
              { errorMessage }
            </div>
            <div className="w-full flex justify-center mt-5 mb-10">
              <div className={BTN_CLASS.dark} onClick={() => handleSubmit()}>
                Save Changes
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default SettingsAccount
