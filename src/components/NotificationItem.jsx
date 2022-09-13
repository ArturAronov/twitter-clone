import { useState, useEffect } from 'react'
import moment from 'moment'

import NotificationModal from './modals/NotificationModal'

const NotificationItem = (props) => {
  const [dateFormat, setDateFormat] = useState()
  const [notificationData, setNotificationData] = useState()

  const notificationRead = 'flex flex-col outline-1 outline outline-zinc-800 px-2 py-1 m-1 hover:bg-zinc-900 cursor-pointer'
  const notificationNotRead = 'flex flex-col outline-1 outline outline-zinc-800 bg-zinc-800 px-2 py-1 m-1 hover:bg-zinc-900 cursor-pointer'

  useEffect(() => {
    const currentDateInt = parseInt(moment(new Date()).format('YYYYMMDD'))
    const tweetDateInt = parseInt(moment(props.notification.sendDate).format('YYYYMMDD'))

    if (currentDateInt - tweetDateInt <= 30) {
      setDateFormat(moment(props.notification.sendDate).fromNow())
    } else if (currentDateInt - tweetDateInt <= 365) {
      setDateFormat(moment(props.notification.sendDate).format('MMM D'))
    } else {
      setDateFormat(moment(props.notification.sendDate).format('MMM D'))
    }
  }, [])
  return (
    <label className={props.notification.received ? notificationRead : notificationNotRead} htmlFor="NotificationModal" onClick={() => setNotificationData(props.notification)}>
      <div className="flex flex-row">
        <div className="text-sky-600 pr-1">
          @{props.notification.content.split(' ')[0]}
        </div>
        <div>
          {props.notification.content.split(' ').slice(1, props.notification.content.length - 1).join(' ')}
        </div>
      </div>
      <div className="text-sm text-zinc-500">
        { dateFormat }
      </div>
      {notificationData?.id && <NotificationModal content={notificationData.content} id={notificationData.id} postId={notificationData.postId}/>}
    </label>
  )
}

export default NotificationItem
