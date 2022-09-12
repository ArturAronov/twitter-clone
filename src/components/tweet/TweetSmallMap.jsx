import { useState } from 'react'

import TweetSmall from './TweetSmall'
import InteractionsBar from './InteractionsBar'
import TweetModal from '../modals/TweetModal'

const TweetSmallMap = (props) => {
  const [post, setPost] = useState()
  const [user, setUser] = useState()
  const [postType, setPostType] = useState()

  const handlePostTypeChange = (type) => {
    setPostType(type)
  }

  return(
    <>
      {
        props.tweets.map(element => {
          return(
            <div
              className=" hover:bg-zinc-800"
              key={props.keyName+element.id}
              onClick={() => {
                setPost(element)
                setUser(element.user)
              }}
            >
              <TweetSmall tweetData={element} userData={props?.userData || element.user} reply={props.reply}/>
              <InteractionsBar post={element} user={element.user} onPostTypeChange={handlePostTypeChange}/>
              <hr/>
            </div>
          )
        })
      }
      <TweetModal type={postType} post={post} user={user}/>
    </>
  )
}

export default TweetSmallMap
