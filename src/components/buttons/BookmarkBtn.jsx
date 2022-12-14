import { useState, useEffect } from 'react'
import axios from 'axios'

import useStats from '../../hooks/useStats'
import useProfile from '../../hooks/useProfile'
import useInteractions from '../../hooks/useInteractions'

import RemoveBookmark from './RemoveBookmark'
import AddBookmark from './AddBookmark'

const BookmarkBtn = (props) => {
  const [postId, setPostId] = useState()
  const { newStats } = useStats(postId)

  const { interactions, newInteraction } = useInteractions()
  const { profile } = useProfile()

  const [interaction, setInteraction] = useState([])
  const [buttonActive, setButtonActive] = useState(false)

  const toggleInteraction = async () => {
    let data = {
      postUserId: profile.id,
      actionType: 'BOOKMARK',
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

    await axios.put('/api/my/interaction', data)
    await newInteraction()
    await newStats()
  }

  const getData = async () => {
    if(interactions && props?.post?.actionType) {
      setInteraction(interactions.filter(element => {
        return element.actionType === 'BOOKMARK' && element.postId === props.post.postId
      }))
    } else if(interactions && props?.post?.postType) {
      setInteraction(interactions.filter(element => {
        return element.actionType === 'BOOKMARK' && element.postId === props.post.id
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
    setPostId(props.post.id)
    interaction.length === 1 ? setButtonActive(<RemoveBookmark />) : setButtonActive(<AddBookmark />)
  }, [profile, interaction])

  return (
    <div
      className="cursor-pointer"
      onClick={async () => {
        if(profile?.id) {
          await toggleInteraction()
          await newInteraction()
        }
      }}
    >
      {buttonActive}
    </div>
  )
}

export default BookmarkBtn
