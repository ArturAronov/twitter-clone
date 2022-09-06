import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import usePrevious from '../../hooks/usePrevious'

import Stats from './Stats'
import UserMenu from './UserMenu'
import MetaInfo from './MetaInfo'
import UserInfo from './UserInfo'
import HeaderImg from './HeaderImg'
import TweetsCount from './TweetsCount'

const Profile = ({ input }, props) => {
  const { query: { slug }, replace } = useRouter()
  // const [ feed, setFeed ] = useState(<Tweets/>)
  const [tab, setTab] = useState('')
  const previousSlug = usePrevious(slug)

  const {
    followersCount,
    followingCount,
    postCount,
    userClean: {
      id,
      userName,
      name,
      bio,
      email,
      joinDate,
      location,
      avatarImg,
      headerImg,
      website
    }
  } = input

  const onTabClick = (value) => {
    setTab(value)
  }

  useEffect(() => {
    if (slug?.[0] !== previousSlug?.[0] && !slug?.[1]) {
      setTab(slug?.[1] || 'tweets')
    }
  }, [slug])

  useEffect(() => {
    if (tab && slug?.[0] && tab !== slug?.[1]) {
      replace(`${slug[0]}/${tab}`)
    }
  }, [tab, slug])

  return (
    <>
      <HeaderImg
        headerImg={headerImg}
      />

      <UserInfo
        avatarImg={avatarImg}
        name={name}
        userName={userName}
        bio={bio}
        id={id}
      />

      <MetaInfo
        location={location}
        website={website}
        joinDate={joinDate}
      />

      <Stats
        following={followingCount}
        followers={followersCount}
      />

      <UserMenu
        onTabClick={onTabClick}
        onClick={() => props.onTabClick(tab)}
        tab={slug[1]}
      />

      <TweetsCount
        tweets={postCount}
      />
    </>
  )
}

export default Profile
