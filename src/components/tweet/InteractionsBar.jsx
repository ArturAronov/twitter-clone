import { useState, useEffect } from 'react'
import TweetModal from '../modals/TweetModal'

import useStats from '../../hooks/useStats';
import LikeBtn from '../buttons/LikeBtn'
import ReplyBtn from '../buttons/ReplyBtn'
import RetweetBtn from '../buttons/RetweetBtn'
import BookmarkBtn from '../buttons/BookmarkBtn'

const InteractionsBar = (props) => {
  const [postType, setPostType] = useState()
  const [postId, setPostId] = useState()
  const { stats } = useStats(postId)

  useEffect(() => {

    setPostId(props.post.id)
  }, [props])

  return(
    <>
      <div className="w-full justify-between flex flex-row ">
        <label
          className="mx-5 cursor-pointer flex flex-row hero-content"
          htmlFor="TweetModal"
          onClick={() => setPostType('REPLY')}
        >
          <span>
            <ReplyBtn />
          </span>
          <span className='text-sm text-zinc-500 pl-1'>
            {stats?.replies && stats.replies}
          </span>
        </label>
        <label
          className="mx-5 cursor-pointer flex flex-row hero-content"
          htmlFor="TweetModal"
          onClick={() => setPostType('RETWEET')}
        >
          <span>
            <RetweetBtn />
          </span>
          <span className='text-sm text-zinc-500 pl-1'>
            {stats?.retweets && stats.retweets}
          </span>
        </label>
        <div className="mx-5 flex flex-row hero-content">
          <span>
            <LikeBtn post={props.post} />
          </span>
          <span className='text-sm text-zinc-500 pl-1'>
            {stats?.likes && stats.likes}
          </span>
        </div>
        <div className="mx-5 flex flex-row hero-content">
          <span className='text-sm text-zinc-500 pl-1'>
            <BookmarkBtn post={props.post} />
          </span>
          <span className='text-sm text-zinc-500 pl-1'>
            {stats?.bookmarks && stats.bookmarks}
          </span>
        </div>
        <TweetModal type={postType} post={props.post} user={props.user}/>
      </div>
    </>
  )
}

export default InteractionsBar
