import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import userInfo from '../hooks/useInfo'
import userProfile from '../hooks/useProfile'
import NavbarUserBtn from './buttons/NavbarUserBtn'

import HeaderTitle from './HeaderTitle'

const Header = () => {
  const [userName, setUserName] = useState('')
  const [headerTitle, setHeaderTitle] = useState('')

  const { profile } = userProfile()
  const { user } = userInfo(userName)
  const { asPath } = useRouter()
  const { query: { slug } } = useRouter()

  useEffect(() => {
    slug && setUserName(slug[0])

    if (user?.id && slug && slug.length > 0) {
      setHeaderTitle(<HeaderTitle component={user.name} userName={user.userName} />)
    } else if (asPath === '/') {
      setHeaderTitle(<HeaderTitle component="" />)
    } else if (asPath === '/home') {
      setHeaderTitle(<HeaderTitle component="Home" />)
    } else if (asPath === '/search') {
      setHeaderTitle(<HeaderTitle component="Search" />)
    } else if (asPath === '/notifications') {
      setHeaderTitle(<HeaderTitle component="Notifications" />)
    } else if (asPath === '/bookmarks') {
      setHeaderTitle(<HeaderTitle component="Bookmarks" />)
    } else if (profile?.id && asPath === `/${profile.userName}`) {
      setHeaderTitle(<HeaderTitle component={profile.name} />)
    } else if (profile?.id && asPath === '/settings') {
      setHeaderTitle(<HeaderTitle component="Settings" />)
    } else if (profile?.id && asPath === '/settings/account') {
      setHeaderTitle(<HeaderTitle component="Account Settings" />)
    } else if (profile?.id && asPath === '/settings/password') {
      setHeaderTitle(<HeaderTitle component="Password Settings" />)
    } else {
      setHeaderTitle(<HeaderTitle component="" />)
    }
  }, [asPath, profile])

  return (
    <div className="sticky top-0 left-0 w-full py-0 sm:py-6 px-3 flex flex-row hero backdrop-blur-md h-16">
      { headerTitle }
    </div>
  )
}

export default Header
