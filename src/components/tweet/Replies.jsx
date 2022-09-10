import { useState, useEffect } from 'react'
import axios from 'axios'

import TweetSmall from './TweetSmall'

const Replies = (props) => {
  const [replies, setReplies] = useState([])

  useEffect(() => {
    axios.get('/api/post/replies/'+props.postId).then(res => setReplies(res.data))
  }, [])
  return(
    <>
      {replies.map(element => {
        return <TweetSmall tweetData={element} userData={element.user} reply={props.userName}/>
      })}
    </>
  )
}

export default Replies
