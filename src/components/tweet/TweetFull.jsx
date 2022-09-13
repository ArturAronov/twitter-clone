import { useState, useEffect } from 'react'
import router from 'next/router'
import moment from 'moment'

import InteractionsBar from './InteractionsBar'
import TinyRetweet from './TinyRetweet'
import FollowBtn from '../buttons/FollowBtn'
import MoreBtn from '../buttons/MoreBtn'
import TweetModal from '../modals/TweetModal'

const TweetFull = (props) => {
  const [dateFormat, setDateFormat] = useState()
  const [postType, setPostType] = useState()

  const handlePostTypeChange = (type) => {
    setPostType(type)
  }

  const {
    tweetData,
  } = props

  useEffect(() => {
  }, [props])

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
  }, [])

  return (
    <div className="flex flex-col mx-4 sm:mx-0 mb-5 sm:mb-10">
      <div className="grid-cols-1 grid-rows-1 divide-zinc-700">
        <div className="w-full flex flex-row">
          <img src={tweetData.user.avatarImg} className="w-16 h-16 object-cover rounded-full m-2 cursor-pointer" onClick={() => router.push(`/${tweetData.user.userName}`)} />
          <div className="w-full cursor-pointer">
            <div className="text-lg font-semibold ">
              { tweetData.user.name }
            </div>
            <div className="text-zinc-500 ">
              @{tweetData.user.userName}
            </div>
          </div>
          <div className="px-5">
            <FollowBtn id={tweetData.user.id} userName={tweetData.user.userName} />
          </div>
          <div>
            <MoreBtn postId={props.tweetData.id} user={props.tweetData.userId} newPage={true}/>
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => router.push(`/tweet/${tweetData.id}`)}>
          <div className="text-3xl mt-5 px-3">
            { tweetData.content }
          </div>
          { tweetData?.mediaUrl &&
            (
              <div className='flex justify-center sm:py-5'>
              <div className='max-w-[80%]'>
                <img src={tweetData.mediaUrl} className='rounded-xl'/>
              </div>
            </div>
            )
          }
        </div>
        <div className='cursor-pointer'>
          {
            tweetData.postType === 'RETWEET' &&
            <div className='flex justify-center'>
              <div className='w-10/12'>
                <TinyRetweet postId={tweetData.postId}/>
              </div>
            </div>
          }
        </div>
        <div className="text-zinc-500 my-2 px-3">
          { dateFormat }
        </div>
        <hr/>
        <div className='px-5'>
          <InteractionsBar post={tweetData} user={tweetData.user} onPostTypeChange={handlePostTypeChange}/>
          <TweetModal type={postType} post={props.tweetData} user={props.tweetData.user}/>
        </div>
        <hr/>
      </div>

    </div>
  )
}

export default TweetFull
