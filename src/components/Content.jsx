import { useState, useEffect } from 'react'
import axios from 'axios'

import NewTweet from './tweet/NewTweet'
import TweetSmallMap from './tweet/TweetSmallMap'

const Content = () => {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    axios.get('/api/all/posts').then(res => setTweets(res.data))
  }, [])

  return(
    <>
      <NewTweet />
      <hr/>
      <TweetSmallMap keyName={'content'} tweets={tweets}/>
    </>
  )
}

export default Content
