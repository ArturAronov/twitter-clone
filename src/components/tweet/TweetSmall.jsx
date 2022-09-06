import { useState, useEffect } from 'react'
import router from 'next/router'
import moment from 'moment'

import TweetModal from '../modals/TweetModal'

import LikeBtn from '../buttons/LikeBtn'
import ReplyBtn from '../buttons/ReplyBtn'
import RetweetBtn from '../buttons/RetweetBtn'
import BookmarkBtn from '../buttons/BookmarkBtn'

import TinyRetweet from './TinyRetweet'

const TweetSmall = (data) => {
  const [dateFormat, setDateFormat] = useState()
  const [postType, setPostType] = useState()

  const {
    tweetData,
    userData
  } = data

  useEffect(() => {
    const currentDateInt = parseInt(moment(new Date()).format('YYYYMMDD'))
    const tweetDateInt = parseInt(moment(tweetData.date).format('YYYYMMDD'))

    if (currentDateInt - tweetDateInt <= 30) {
      setDateFormat(moment(tweetData.date).fromNow())
    } else if (currentDateInt - tweetDateInt <= 365) {
      setDateFormat(moment(tweetData.date).format('MMM D'))
    } else {
      setDateFormat(moment(tweetData.date).format('MMM D'))
    }
  }, [tweetData])

  return (
    <div className="flex flex-row py-2 hover:bg-zinc-900 outline outline-1 outline-zinc-700 mr-[1px] mb-[1px] px-5">
      <img src={userData.avatarImg} className="w-10 h-10 object-cover rounded-full m-2 cursor-pointer" onClick={() => router.push(`/${userData.userName}`)} />
      <div className="w-full  cursor-pointer">
        <div onClick={() => router.push(`/tweet/${tweetData.id}`)}>
          <div className="w-full">
            <span className="pr-1 font-bold">{userData.name}</span>
            <span className="pr-1 text-zinc-500">@{userData.userName}</span>
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
              { tweetData.content }
            </div>
            { data?.tweetData?.mediaUrl
              && (
              <div className="hero-content py-3">
                <img src={data.tweetData.mediaUrl} />
              </div>
              )}

            {
              tweetData.postType === 'RETWEET'
              && (
              <div className="border border-zinc-700 rounded-lg px-3 py-2 mt-2 hover:bg-zinc-800" onClick={() => router.push(`/tweet/${tweetData.postId}`)}>
                <TinyRetweet postId={tweetData.postId} />
              </div>
              )
            }
          </div>
        </div>
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
            <div className="w-8 h-8 hero-content"> <LikeBtn id={tweetData.id} /> </div>
            <div>  </div>
          </div>
          <div className="mx-5"> <BookmarkBtn id={tweetData.id} /> </div>
          <TweetModal type={postType} post={tweetData} user={userData} />
        </div>
      </div>

    </div>
  )
}

export default TweetSmall
