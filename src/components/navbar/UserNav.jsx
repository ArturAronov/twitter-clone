import { useRouter } from 'next/router'

import useProfile from '../../hooks/useProfile'

import TwitterBtn from '../buttons/TwitterBtn'
import HomeBtn from '../buttons/HomeBtn'
import HomeBtnActive from '../buttons/HomeBtnActive'
import NotificationsBtnActive from '../buttons/NotificationsBtnActive'
import NotificationsBtn from '../buttons/NotificationsBtn'
import BookmarksBtnInactive from '../buttons/BookmarksBtnInactive'
import BookmarksBtnActive from '../buttons/BookmarksBtnActive'
import SearchBtn from '../buttons/SearchBtn'
import SearchBtnActive from '../buttons/SearchBtnActive'
import ProfileBtn from '../buttons/ProfileBtn'
import ProfileBtnActive from '../buttons/ProfileBtnActive'
import SidebarTweetBtn from '../buttons/SidebarTweetBtn'
import SidebarTweetBtnInactive from '../buttons/SidebarTweetBtnInactive'
import NavbarUserBtn from '../buttons/NavbarUserBtn'

const UserNav = () => {
  const router = useRouter()
  const { asPath } = useRouter()
  const { profile, newProfile } = useProfile()

  const handleClick = (href) => router.push(href)

  return (
    <div className="sm:h-screen sm:w-content flex sm:flex-col flex-row bg-zinc-1000 sticky sm:top-0 bottom-0 w-full justify-between">
      <div className="flex flex-row sm:flex-col justify-evenly w-full  px-0">
        <div className="hidden sm:inline" onClick={() => handleClick('/home')}>
          <TwitterBtn fill="#fff" />
        </div>
        <div onClick={() => handleClick('/home')}>
          {asPath === '/home' ? <HomeBtnActive /> : <HomeBtn />}
        </div>

        <div onClick={() => handleClick('/search')}>
          {asPath === '/search' ? <SearchBtnActive /> : <SearchBtn />}
        </div>

        {profile?.id && (
        <div onClick={() => handleClick('/notifications')}>
          {asPath === '/notifications' ? <NotificationsBtnActive /> : <NotificationsBtn />}
        </div>
        )}

        {profile?.id && (
        <div onClick={() => handleClick('/bookmarks')}>
          {asPath === '/bookmarks' ? <BookmarksBtnActive /> : <BookmarksBtnInactive />}
        </div>
        )}

        {profile?.id && (
        <div onClick={() => handleClick(`/${profile.userName}`)}>
          {profile?.userName && asPath.split('/').includes(profile.userName) ? <ProfileBtnActive /> : <ProfileBtn />}
        </div>
        )}

        {
          asPath !== '/compose/tweet'
          && (
          <div>
            { profile?.id ? <SidebarTweetBtn /> : <SidebarTweetBtnInactive /> }
          </div>
          )
        }

      </div>
      <div className="hidden sm:inline">
        <NavbarUserBtn />
      </div>
    </div>
  )
}

export default UserNav
