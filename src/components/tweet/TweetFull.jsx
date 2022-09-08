import { useState, useEffect } from 'react'
import router from 'next/router'
import moment from 'moment'

import TweetModal from '../modals/TweetModal'

import FollowBtn from '../buttons/FollowBtn'
import LikeBtn from '../buttons/LikeBtn'
import ReplyBtn from '../buttons/ReplyBtn'
import RetweetBtn from '../buttons/RetweetBtn'
import BookmarkBtn from '../buttons/BookmarkBtn'

const TweetFull = ({ tweet, replies }) => {
  const [dateFormat, setDateFormat] = useState()
  const [postType, setPostType] = useState()

  useEffect(() => {
    const currentDateInt = parseInt(moment(new Date()).format('YYYYMMDD'))
    const tweetDateInt = parseInt(moment(tweet.date).format('YYYYMMDD'))

    if (currentDateInt - tweetDateInt <= 30) {
      setDateFormat(moment(tweet.date).fromNow())
    } else if (currentDateInt - tweetDateInt <= 365) {
      setDateFormat(moment(tweet.date).format('MMM D'))
    } else {
      setDateFormat(moment(tweet.date).format('MMM D'))
    }
  }, [])

  return (
    <div className="flex flex-col mx-4 sm:mx-0 mb-5 sm:mb-10">
      <div className="grid-cols-1 grid-rows-1 divide-zinc-700">
        <div className="w-full flex flex-row">
          <img src={tweet.user.avatarImg} className="w-16 h-16 object-cover rounded-full m-2 cursor-pointer" onClick={() => router.push(`/${tweet.user.userName}`)} />
          <div className="w-full cursor-pointer">
            <div className="text-lg font-semibold ">
              { tweet.user.name }
            </div>
            <div className="text-zinc-500 ">
              @{tweet.user.userName}
            </div>
          </div>
          <div className="px-5">
            <FollowBtn id={tweet.user.id} userName={tweet.user.userName} />
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => router.push(`/tweet/${tweet.id}`)}>
          <div className="text-3xl mt-5 px-3">
            { tweet.content }
          </div>
          { tweet?.mediaUrl &&
            (
              <div className="hero-content py-3">
                <img src={tweet.mediaUrl} />
              </div>
            )
          }
          <div className="text-zinc-500 my-2 px-3">
            { dateFormat }
          </div>
        </div>
        <div className="flex flex-row outline outline-1 outline-zinc-700 p-2">
          <div className="pr-3 text-sm">
            <span className="font-semibold">15 </span>
            <span className="text-zinc-500">Comments</span>
          </div>
          <div className="pr-3 text-sm">
            <span className="font-semibold">15 </span>
            <span className="text-zinc-500">Replies</span>
          </div>
          <div className="pr-3 text-sm">
            <span className="font-semibold">15 </span>
            <span className="text-zinc-500">Retweets</span>
          </div>
        </div>
        <div className="w-full justify-around flex flex-row p-3">
          <div className="mx-5"> <LikeBtn id={tweet.id} /> </div>
          <label
            className="mx-5 cursor-pointer"
            htmlFor="TweetModal"
            onClick={() => setPostType('REPLY')}
          > <ReplyBtn /> </label>
          <label
            className="mx-5 cursor-pointer"
            htmlFor="TweetModal"
            onClick={() => setPostType('RETWEET')}
          > <RetweetBtn /> </label>
          <div className="mx-5"> <BookmarkBtn post={tweet} /> </div>
          <TweetModal type={postType} post={tweet} />
        </div>
        <div className="">
          {/* {
            replies
            && replies.map((element) => <TweetSmall tweetData={element} userData={element.user} replyingTo={tweet.user} />)
          } */}
        </div>
      </div>
    </div>
  )
}

export default TweetFull
