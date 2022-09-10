import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import useNotifications from '../../hooks/useNotifications'

import NotificationsBtnInactive from './NotificationsBtnInactive'
import NotificationsBtnActive from './NotificationsBtnActive'

const NotificationsBtn = () => {
  const { asPath } = useRouter()
  const { notifications, newNotifications } = useNotifications()
  const [notificationsCount, setNotificationsCount] = useState(0)

  useEffect(() => {
    // newNotifications()
    if(notifications) {
      const count = notifications.filter(element => element.received === false).length
      setNotificationsCount(count)
    }
  }, [notifications])

  return(
    <div className='relative'>
      <span>
        {asPath === '/notifications' ? <NotificationsBtnActive /> : <NotificationsBtnInactive />}
      </span>
      {
        notificationsCount > 0 &&
        <span className='h-[15px] min-w-[15px] absolute top-1 right-9 bg-sky-500 rounded-full text-xs text-center text-zinc-0 px-1'>
          {notificationsCount}
        </span>
      }
    </div>
  )
}

export default NotificationsBtn
