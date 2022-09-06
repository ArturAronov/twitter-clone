import { useState, useEffect } from 'react'
import axios from 'axios'

import BTN_CLASS from '../../globalVars/btn_class'

import useInteractions from '../../hooks/useInteractions'
import useProfile from '../../hooks/useProfile'
import useFollowers from '../../hooks/useFollowers'

const FollowBtn = (props) => {
  const { interactions, newInteraction } = useInteractions()
  const { profile } = useProfile()
  const { newFollowers } = useFollowers(props.userName)
  const [btnClass, setBtnClass] = useState()
  const [btnText, setBtnText] = useState('')
  const [follow, setFollow] = useState([])

  const toggleInteraction = async (followingUserId, interaction) => {
    const data = {
      actionType: interaction,
      followingUserId
    }
    await axios.put('/api/my/interaction', data)
    await newInteraction()
  }

  const following = () => {
    interactions && setFollow(interactions.filter((element) => element.actionType === 'FOLLOW' && element.followingUserId === props.id))
  }

  const getData = async () => {
    const data = await axios.get('/api/my/follows-likes-bookmarks').then((res) => res.data)

    if(data?.filter) {
      const filterActionTypeProps = data.filter((element) => {
        if(element.actionType === 'FOLLOW' && element.followingUserId === props.id) {
          return element
        }
      })

      setFollow(filterActionTypeProps)
    }
    // await setFollow(data.filter((element) => element.actionType === 'FOLLOW' && element.followingUserId === props.id))
    return data
  }

  useEffect(() => {
    if (profile?.id && profile.id === props.id) {
      setBtnClass()
      setBtnText('')
    } else if (follow && follow.length > 0) {
      setBtnClass(BTN_CLASS.darkWarningHover)
      setBtnText('Unfollow')
    } else {
      setBtnClass(BTN_CLASS.primary)
      setBtnText('Follow')
    }
  }, [follow, profile])

  useEffect(() => {
    interactions && getData()
  }, [interactions])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div
      className={btnClass}
      onClick={async () => {
        await toggleInteraction(props.id, 'FOLLOW')
        await following()
        await newFollowers()
      }}
    >
      {btnText}
    </div>
  )
}

export default FollowBtn
