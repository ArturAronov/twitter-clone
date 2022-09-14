import { useState, useEffect } from 'react'
import axios from 'axios'

import BTN_CLASS from '../../globalVars/btn_class'

import useInteractions from '../../hooks/useInteractions'
import useProfile from '../../hooks/useProfile'
import useFollowers from '../../hooks/useFollowers'
import useFollowing from '../../hooks/useFollowing'

const FollowBtn = (props) => {
  const [userName, setUserName] = useState()
  const [profileUserName, setProfileUserName] = useState()
  const { interactions, newInteraction } = useInteractions()
  const { profile } = useProfile()
  const { newFollowers } = useFollowers(userName)
  const { newFollowing } = useFollowing(profileUserName)
  const [btnClass, setBtnClass] = useState()
  const [btnText, setBtnText] = useState('')
  const [interaction, setInteraction] = useState([])

  const toggleInteraction = async() => {
    const data = {
      interactionUserId: props.id,
      postUserId: profile.id,
      actionType: 'FOLLOW',
    }
    await axios.put('/api/my/interaction', data)
  }

  const getData = async () => {
    if(interactions) {
      setInteraction(interactions.filter(element => {
        if(element.actionType === 'FOLLOW' && profile?.id && element.postUserId === profile.id) {
          return element
        }
      }))
    }
  }

  useEffect(() => {
    getData()

    if(profile?.userName) {
      setProfileUserName(profile.userName)
    }
  },[])

  useEffect(() => {
    getData()
    axios.get('/api/usersId/'+props.id).then(res => setUserName(res.data.userName))
  },[interactions])

  useEffect(() => {
    if (profile?.id && profile.id === props.id) {
      setBtnClass()
      setBtnText('')
    } else if (interaction.length > 0) {
      setBtnClass(BTN_CLASS.primary)
      setBtnText('Follow')
      interaction.map(element => {
        if(element.interactionUserId === props.id){
          setBtnClass(BTN_CLASS.darkWarningHover)
          setBtnText('Unfollow')
        }
      })

    } else {
      setBtnClass(BTN_CLASS.primary)
      setBtnText('Follow')
    }
  }, [profile, interaction])

  return (
    <>
      {
        profile?.id &&
        <div
          className={btnClass}
          onClick={async () => {
            if(profile?.id) {
              await toggleInteraction()
              await newInteraction()
              await newFollowers()
              await newFollowing()
            }
          }}
        >
          {btnText}
        </div>
      }
    </>
  )
}

export default FollowBtn
