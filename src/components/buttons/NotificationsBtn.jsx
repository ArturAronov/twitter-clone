import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import useNotifications from '../../hooks/useNotifications'

import NotificationsBtnInactive from './NotificationsBtnInactive'
import NotificationsBtnActive from './NotificationsBtnActive'

const NotificationsBtn = () => {
  const { asPath } = useRouter()
  const { notifications } = useNotifications()
  const [notificationsCount, setNotificationsCount] = useState(0)

  useEffect(() => {
    if(notifications) {
      const count = notifications.filter(element => element.received === false).length
      setNotificationsCount(count)
    }
  }, [notifications])

  return(
    <div className='w-full flex justify-center'>
      <div className='relative w-11 h-full'>
        <span>
          {asPath === '/notifications' ? <NotificationsBtnActive /> : <NotificationsBtnInactive />}
        </span>
        {
          notificationsCount > 0 &&
          <span className='h-[15px] min-w-[15px] absolute top-3 right-1 bg-sky-500 rounded-full text-xs text-center text-zinc-0 px-1'>
            {notificationsCount}
          </span>
        }
      </div>
    </div>
  )
}

export default NotificationsBtn
