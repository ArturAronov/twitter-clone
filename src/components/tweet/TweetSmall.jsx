import { useState, useEffect } from 'react'
import router from 'next/router'
import moment from 'moment'
import axios from 'axios'

import InteractionsBar from './InteractionsBar'
import TinyRetweet from './TinyRetweet'

const TweetSmall = (props) => {
  const [dateFormat, setDateFormat] = useState()
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
    <>
      <div className="flex flex-row py-2 hover:bg-zinc-800 mr-[1px] mb-[1px] sm:px-5">

        <img src={postUser.avatarImg} className="w-10 h-10 object-cover rounded-full m-4 cursor-pointer" onClick={() => router.push(`/${postUser.userName}`)} />
        <div className="w-full  cursor-pointer">
          <div onClick={() => router.push(`/tweet/${postFeed.id}`)}>
            <div className="w-full">
              <span className="pr-1 font-bold">{postUser.name}</span>
              <span className="pr-1 text-zinc-500">@{postUser.userName}</span>
              <span className="pr-1 text-zinc-500">·</span>
              <span className="pr-1 text-zinc-500">{ dateFormat }</span>
            </div>
            <div>
              {
                props?.reply &&
                <div className='text-sm pb-1'>
                  <span>
                    Replying to
                  </span>
                  <span className='text-sky-500 pl-1 hover:underline' onClick={() => router.push(`/${props.reply}`)}>
                    @{props.reply}
                  </span>
                </div>
              }
            </div>
            <div className="cursor-pointer">
              <div>
                { postFeed?.content && postFeed.content }
              </div>
              {
                props?.tweetData?.mediaUrl &&
                <div className='flex justify-center sm:py-5'>
                  <div className='max-w-[90%]'>
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
        </div>
      </div>
      <div className='mx-5'>
        <InteractionsBar post={tweetData} user={userData}/>
      </div>
      <hr/>
    </>
  )
}

export default TweetSmall
