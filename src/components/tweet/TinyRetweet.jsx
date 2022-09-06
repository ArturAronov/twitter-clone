import { useState, useEffect } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'

import TinyProfile from '../profile/TinyProfile'

const TinyRetweet = (props) => {
  const [dateFormat, setDateFormat] = useState()

  const { data: showRetweet } = useSWR(
    // Pass null when there is no id
    props.postId ? (`/api/my/posts/${props.postId}`) : null,
    (key) => axios.get(key).then((res) => res.data)
  )

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
        <div>
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
