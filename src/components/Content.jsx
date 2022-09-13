import { useState, useEffect } from 'react'

import NewTweet from './tweet/NewTweet'
import TweetSmallMap from './tweet/TweetSmallMap'

import useAllPosts from '../hooks/useAllPosts'

const Content = () => {
  const { allPosts } = useAllPosts()
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    if(allPosts) {
      setTweets(allPosts)
    }
  }, [allPosts])

  return(
    <>
      <NewTweet />
      <hr/>
      <TweetSmallMap keyName={'content'} tweets={tweets}/>
    </>
  )
}

export default Content
