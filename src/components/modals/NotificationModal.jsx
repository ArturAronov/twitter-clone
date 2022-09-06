import router from 'next/router'
import axios from 'axios'
import userNotifications from '../../hooks/userNotifications'
import BTN_CLASS from '../../globalVars/btn_class'

const NotificationModal = (props) => {
  const { notifications, newNotifications } = userNotifications()
  const data = { id: parseInt(props.id) }

  return (
    <div>
      <input className="modal-toggle" type="checkbox" id="NotificationModal" />
      <div className="modal">
        <div className="modal-box border border-zinc-700 bg-zinc-1000 rounded-lg p-3">
          <div className="flex flex-row">
            <div className="text-sky-600 pr-1" onClick={() => router.push(`${props.content.split(' ')[0]}`)}>
              @{props.content.split(' ')[0]}
            </div>
            <div>
              {props.content.split(' ').slice(1, props.content.length - 1).join(' ')}
            </div>
          </div>
          <div className="modal-action hero-content p-5">
            <label
              className={BTN_CLASS.primary}
              htmlFor="NotificationModal"
              onClick={async () => {
                await axios.put('/api/my/notifications/read', data)
                await newNotifications()
              }}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal