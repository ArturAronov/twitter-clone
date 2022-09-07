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

  const toggleInteraction = async() => {
    const data = {
      interactionUserId: props.id,
      postUserId: profile.id,
      actionType: 'FOLLOW',
    }
    await axios.put('/api/my/interaction', data)
    await newInteraction()
  }

  const getData = async () => {
    const data = await axios.get('/api/my/interactions').then((res) => res.data)

    if(data?.filter) {
      const filterActionTypeProps = data.filter((element) => {
        if(element.actionType === 'FOLLOW' && element.followingUserId === props.id) {
          return element
        }
      })
    }
    return data
  }

  useEffect(() => {
    if (profile?.id && profile.id === props.id) {
      setBtnClass()
      setBtnText('')
    } else if (interactions && interactions.length > 0) {
      setBtnClass(BTN_CLASS.darkWarningHover)
      setBtnText('Unfollow')
    } else {
      {console.log('here')}
      setBtnClass(BTN_CLASS.primary)
      setBtnText('Follow')
    }
  }, [profile, interactions])

  useEffect(() => {
    if(interactions) {
      getData()
    }
  }, [interactions])

  return (
    <div
      className={btnClass}
      onClick={async () => {
        await toggleInteraction()
        await newFollowers()
      }}
    >
      {btnText}
    </div>
  )
}

export default FollowBtn
