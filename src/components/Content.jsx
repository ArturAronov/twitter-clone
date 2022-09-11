import { useState, useEffect } from 'react'
import axios from 'axios'

import TweetSmall from './tweet/TweetSmall'
import NewTweet from './tweet/NewTweet'

const Content = () => {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    axios.get('/api/all/posts').then(res => setTweets(res.data))
  }, [])

  return(
    <>
      <NewTweet />
      <hr/>
      {
        tweets.map(element => {
          return(
            <TweetSmall tweetData={element} userData={element.user} />
          )
        })
      }
    </>
  )
}

export default Content
