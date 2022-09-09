import { useState, useEffect } from 'react'
import router from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'

import TinyProfile from '../profile/TinyProfile'

const TinyRetweet = (props) => {
  const [dateFormat, setDateFormat] = useState()

  const { data: showRetweet } = useSWR(
    // Pass null when there is no id
    props.postId ? (`/api/post/${props.postId}`) : null,
    (key) => axios.get(key).then((res) => res.data)
  )

  const borderReply = 'mr-2 pt-3'
  const borderNormal = 'mr-2 sm:my-4 p-3 border border-zinc-700 rounded-lg hover:bg-zinc-900'

  useEffect(() => {
    const currentDateInt = parseInt(moment(new Date()).format('YYYYMMDD'))
    const tweetDateInt = showRetweet?.date && parseInt(moment(showRetweet.date).format('YYYYMMDD'))

    if (currentDateInt - tweetDateInt <= 30) {
      showRetweet?.date && setDateFormat(moment(showRetweet.date).fromNow())
    } else if (currentDateInt - tweetDateInt <= 365) {
      showRetweet?.date && setDateFormat(moment(showRetweet.date).format('MMM D'))
    } else {
      showRetweet?.date && setDateFormat(moment(showRetweet.date).format('MMM D'))
    }
  }, [showRetweet])

  return (
    <>
      {
        showRetweet?.id
        && (
        <div className={props.reply ? borderReply : borderNormal} onClick={() => router.push(`/tweet/${showRetweet.id}`)}>
          <div className="flex flex-row hero">
            <div>
              <TinyProfile userId={showRetweet.userId} />
            </div>
            <div className="px-1"> · </div>
            <div className="text-zinc-500 pr-1">
              { dateFormat }
            </div>
          </div>
          <div className="pl-7">
            { showRetweet.content }
          </div>
        </div>
        )
      }
    </>
  )
}

export default TinyRetweet
