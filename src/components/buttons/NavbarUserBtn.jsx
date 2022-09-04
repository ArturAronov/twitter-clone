import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import userProfile from '../../hooks/useProfile'
import UserStats from '../profile/UserStats'

const NavbarUserBtn = () => {
  const router = useRouter()
  const { profile, newProfile } = userProfile()

  const handleLogOut = async () => {
    await axios.delete('/api/auth/logout')
    await newProfile('/api/my/profile')
    await router.push('/')
  }

  return (
    <div className="dropdown sm:dropdown-right sm:dropdown-top sm:hero-content sm:mb-5 bg-zinc-1000">
      <label tabIndex="0" className="avatar my-2 sm:hero-content">
        <div className="w-10 h-10 sm:w-[48px] sm:h-[48px]">
          <img src={profile?.id ? profile.avatarImg : 'https://unit-2-cardify.s3.ap-northeast-1.amazonaws.com/twitter-avatar.jpg'} className="w-10 h-10 object-cover rounded-full cursor-pointer" />
        </div>
      </label>
      <div tabIndex="0" className="dropdown-content menu p-0 m-0 bg-base-100 shadow-zinc-500 shadow-md sm:border border-zinc-700 w-40 top-0 -left-3 sm:h-content sm:w-content sm:rounded-md p-2 h-screen sm:h-min">
        {
              profile?.id
              && <div> <UserStats /> </div>
            }
        <div className="flex flex-col justify-between sm:justify-start mt-5">
          {
                profile?.id
                && (
                <div
                  className="hover:bg-zinc-800 px-2 py-3 cursor-pointer"
                  onClick={() => router.push('/settings')}
                >
                  Settings
                </div>
                )
}
          <label>
            {
                  profile?.id
                  && (
                  <div
                    className="hover:bg-zinc-800 px-2 py-3 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </div>
                  )
                }
            {
                  !profile?.id
                  && (
                  <label
                    className="hover:bg-zinc-800 px-2 py-3 cursor-pointer modal-action"
                    onClick={() => {
                      router.push('/auth/signup')
                      newProfile('/api/my/profile')
                    }}
                  >
                    Sign Up
                  </label>
                  )
                }
            {
                  !profile?.id
                  && (
                  <div
                    className="hover:bg-zinc-800 px-2 py-3 cursor-pointer"
                    onClick={() => {
                      router.push('/auth/login')
                      newProfile('/api/my/profile')
                    }}
                  >
                    Log In
                  </div>
                  )
                }
          </label>
        </div>
      </div>
    </div>
  )
}

export default NavbarUserBtn
