import useNotifications from '../../hooks/useNotifications'
import NotificationItem from '../../components/NotificationItem'

const Notifications = () => {
  const { notifications, newNotifications } = useNotifications()

  return (
    <div>
      {
        notifications
        && notifications.map((element) => (
          <div key={element.id}>
            <NotificationItem notification={element} />
          </div>
        ))
      }
    </div>
  )
}

export default Notifications
