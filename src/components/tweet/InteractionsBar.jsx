import { useState, useEffect } from 'react'

import useStats from '../../hooks/useStats';
import LikeBtn from '../buttons/LikeBtn'
import ReplyBtn from '../buttons/ReplyBtn'
import RetweetBtn from '../buttons/RetweetBtn'
import BookmarkBtn from '../buttons/BookmarkBtn'

const InteractionsBar = (props) => {
  const [postId, setPostId] = useState()
  const [postType, setPostType] = useState()
  const { stats } = useStats(postId)

  useEffect(() => {

    setPostId(props.post.id)
  }, [props])

  return(
    <div className='mx-5'>
      <div className="w-full justify-between flex flex-row z-0">
        <label
          className="mx-5 cursor-pointer flex flex-row"
          htmlFor="TweetModal"
          onClick={() => props.onPostTypeChange('REPLY')}
        >
          <span>
            <ReplyBtn />
          </span>
          <span className='text-sm text-zinc-500 pl-1 hero-content'>
            {stats?.replies && stats.replies}
          </span>
        </label>
        <label
          className="mx-5 cursor-pointer flex flex-row"
          htmlFor="TweetModal"
          onClick={() => props.onPostTypeChange('RETWEET')}
        >
          <div>
            <RetweetBtn />
          </div>
          <span className='text-sm text-zinc-500 pl-1 hero-content'>
            {stats?.retweets && stats.retweets}
          </span>
        </label>
        <div className="mx-5 flex flex-row">
          <span>
            <LikeBtn post={props.post} />
          </span>
          <span className='text-sm text-zinc-500 pl-1 hero-content'>
            {stats?.likes && stats.likes}
          </span>
        </div>
        <div className="mx-5 flex flex-row">
          <span className='text-sm text-zinc-500 pl-1'>
            <BookmarkBtn post={props.post} />
          </span>
          <span className='text-sm text-zinc-500 pl-1 hero-content'>
            {stats?.bookmarks && stats.bookmarks}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InteractionsBar
