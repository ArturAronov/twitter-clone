import { useState, useEffect } from 'react'
import axios from 'axios'
import useInteractions from '../../hooks/useInteractions'

import LikeBtnSVG from './LikeBtnSVG'

const LikeBtn = (props) => {
  const { interactions, newInteraction } = useInteractions()

  const [buttonActive, setButtonActive] = useState()
  const [likes, setLikes] = useState([])

  const toggleInteraction = async (postId, interaction) => {
    const data = {
      actionType: interaction,
      postId
    }
    await axios.put('/api/my/interaction', data)
    await newInteraction()
  }

  const like = () => {
    setLikes(interactions.filter((element) => element.actionType === 'LIKE' && element.postId === props.id))
  }

  const getData = async () => {
    const data = await axios.get('/api/my/interactions').then((res) => res.data)

    setLikes(data.filter((element) => element.actionType === 'LIKE' && element.postId === props.id))

    return data
  }
  useEffect(() => {
    getData()
  }, [interactions])

  useEffect(() => {
    setButtonActive(likes.length === 1)
  }, [likes, interactions])

  return (
    <div
      className="cursor-pointer"
      onClick={async () => {
        await toggleInteraction(props.id, 'LIKE')
        await like()
      }}
    >
      <LikeBtnSVG like={buttonActive} />
    </div>
  )
}

// likePosts.length ? <LikeBtn like={true} /> : <LikeBtn like={false} />

export default LikeBtn
