import { useRouter } from 'next/router'

import ProfileBtnSettings from '../../components/icons/ProfileBtnSettings'
import ArrowRight from '../../components/icons/ArrowRight'
import KeyIcon from '../../components/icons/KeyIcon'

const Settings = () => {
  const router = useRouter()

  return (
    <div className="w-full my-3 sm:my-5 lg:my-10">
      <div className="p-1 sm:p-3 lg:p-5 flex flex-row hover:bg-zinc-800 cursor-pointer items-center" onClick={() => router.push('/settings/account')}>
        <div className="w-11 h-11 pt-1 flex flex-col justify-center">
          <ProfileBtnSettings />
        </div>
        <div className="flex flex-col w-full ml-3">
          <div> Account information </div>
          <div className="text-sm text-zinc-500"> Change your account information. </div>
        </div>
        <div>
          <ArrowRight />
        </div>
      </div>

      <div className="p-1 sm:p-3 lg:p-5 flex flex-row hover:bg-zinc-800 cursor-pointer items-center" onClick={() => router.push('/settings/password')}>
        <div className="w-11 h-11 pt-1 flex flex-col justify-center">
          <KeyIcon />
        </div>
        <div className="flex flex-col w-full ml-3">
          <div> Change your password </div>
          <div className="text-sm text-zinc-500"> Change your password at any time. </div>
        </div>
        <div>
          <ArrowRight />
        </div>
      </div>
    </div>
  )
}

export default Settings
