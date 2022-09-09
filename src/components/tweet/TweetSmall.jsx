import { useState, useEffect } from 'react'
import router from 'next/router'
import moment from 'moment'
import axios from 'axios'

import TweetModal from '../modals/TweetModal'

import LikeBtn from '../buttons/LikeBtn'
import ReplyBtn from '../buttons/ReplyBtn'
import RetweetBtn from '../buttons/RetweetBtn'
import BookmarkBtn from '../buttons/BookmarkBtn'

import TinyRetweet from './TinyRetweet'

const TweetSmall = (props) => {
  const [dateFormat, setDateFormat] = useState()
  const [postType, setPostType] = useState()
  const [postFeed, setPostFeed] = useState()
  const [postUser, setPostUser] = useState([])

  const {
    tweetData,
    userData
  } = props

  useEffect(() => {
    if(tweetData?.actionType) {
      setPostFeed(tweetData.post)
      axios.get(`/api/usersId/${tweetData.post.userId}`).then(res => setPostUser(res.data))
    } else {
      setPostFeed(tweetData)
      setPostUser(userData)
    }
  }, [])

  useEffect(() => {
    if(postFeed) {
      const currentDateInt = parseInt(moment(new Date()).format('YYYYMMDD'))
      const tweetDateInt = parseInt(moment(postFeed.date).format('YYYYMMDD'))

      if (currentDateInt - tweetDateInt <= 30) {
        setDateFormat(moment(postFeed.date).fromNow())
      } else if (currentDateInt - tweetDateInt <= 365) {
        setDateFormat(moment(postFeed.date).format('MMM D'))
      } else {
        setDateFormat(moment(postFeed.date).format('MMM D'))
      }
    }
  }, [postFeed])

  return (
    <div className="flex flex-row py-2 hover:bg-zinc-800 outline outline-1 outline-zinc-700 mr-[1px] mb-[1px] sm:px-5">
      <img src={postUser.avatarImg} className="w-10 h-10 object-cover rounded-full m-2 cursor-pointer" onClick={() => router.push(`/${postUser.userName}`)} />
      <div className="w-full  cursor-pointer">
        <div onClick={() => router.push(`/tweet/${postFeed.id}`)}>
          <div className="w-full">
            <span className="pr-1 font-bold">{postUser.name}</span>
            <span className="pr-1 text-zinc-500">@{postUser.userName}</span>
            <span className="pr-1 text-zinc-500">·</span>
            <span className="pr-1 text-zinc-500">{ dateFormat }</span>
          </div>
          <div className="cursor-pointer">
            {/* {
              tweetData.postType === 'REPLY' &&
              <div className>

                <span className='text-zinc-500'>Replying to</span>
                <span className='text-sky-500 pl-1 hover:underline' onClick={() => router.push(`/${data.replyingTo.userName}`)}>@{data.replyingTo.userName}</span>
              </div>
            } */}
            <div>
              { postFeed?.content && postFeed.content }
            </div>
            { props?.tweetData?.mediaUrl &&
              <div className='flex justify-center sm:py-5'>
                <div className='max-w-[95%]'>
                  <img src={props.tweetData.mediaUrl} className='rounded-xl'/>
                </div>
              </div>
            }
          </div>
        </div>
        {
          tweetData.postType === 'RETWEET' &&
          <div>
            <TinyRetweet postId={tweetData.postId} />
          </div>
        }
        <div className="flex flex-row justify-between py-1 w-full">
          <label
            className="flex flex-row hero-content py-1 hover:text-emerald-600 text-sm text-zinc-500 cursor-pointer"
            htmlFor="TweetModal"
            onClick={() => setPostType('REPLY')}
          >
            <div className="w-8 h-8 hero-content"> <ReplyBtn /> </div>
            <div>  </div>
          </label>
          <label
            className="flex flex-row hero-content py-1 hover:text-sky-600 text-sm text-zinc-500 cursor-pointer"
            htmlFor="TweetModal"
            onClick={() => setPostType('RETWEET')}
          >
            <div className="w-8 h-8 hero-content"> <RetweetBtn /> </div>
            <div>  </div>
          </label>
          <div className="flex flex-row hero-content py-1 hover:text-pink-600 group-hover:pink-600 text-sm text-zinc-500 cursor-pointer">
            <div className="w-8 h-8 hero-content"> <LikeBtn post={tweetData} /> </div>
            <div>  </div>
          </div>
          <div className="mx-5"> <BookmarkBtn post={tweetData} /> </div>
        </div>
          <TweetModal type={postType} post={tweetData} user={userData} />
      </div>
    </div>
  )
}

export default TweetSmall
