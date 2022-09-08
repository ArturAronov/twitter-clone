import { useState, useEffect } from 'react'
import axios from 'axios'

import LikeBtnSVG from './LikeBtnSVG'

import useInteractions from '../../hooks/useInteractions'
import useProfile from '../../hooks/useProfile'

const LikeBtn = (props) => {
  const { interactions, newInteraction } = useInteractions()
  const { profile } = useProfile()
  const [interaction, setInteraction] = useState([])

  const [buttonActive, setButtonActive] = useState(false)

  const toggleInteraction = async () => {
    let data = {
      postUserId: profile.id,
      actionType: 'LIKE',
    }

    if(props?.post?.post?.userId) {
      // Since the data feed from Likes component is different from the other components, there the interactionUserId needs to come from a different source
      data = {
        ...data,
        interactionUserId: props.post.post.userId,
        postId: props.post.postId,
      }
    } else {
      data = {
        ...data,
        interactionUserId: props.post.userId,
        postId: props.post.id,
      }
    }

    console.log(data)

    await axios.put('/api/my/interaction', data)
    await newInteraction()
  }

  const getData = async () => {
    if(interactions && props?.post?.actionType) {
      setInteraction(interactions.filter(element => {
        return element.actionType === 'LIKE' && element.postId === props.post.postId
      }))
    } else if(interactions && props?.post?.postType) {
      setInteraction(interactions.filter(element => {
        return element.actionType === 'LIKE' && element.postId === props.post.id
      }))
    }
  }

  useEffect(() => {
    getData()
  },[])

  useEffect(() => {
    getData()
  },[interactions])


  useEffect(() => {
    if (interaction.length > 0) {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }, [profile, interaction])

  return (
    <div
      className="cursor-pointer"
      onClick={async () => {
        await toggleInteraction()
        await newInteraction()
      }}
    >
      <LikeBtnSVG like={buttonActive} />
    </div>
  )
}

export default LikeBtn
