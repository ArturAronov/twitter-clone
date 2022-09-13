import router from 'next/router'
import axios from 'axios'

import useNotifications from '../../hooks/useNotifications'
import useProfile from '../../hooks/useProfile'

import BTN_CLASS from '../../globalVars/btn_class'

const NotificationModal = (props) => {
  const { newNotifications } = useNotifications()
  const data = { id: parseInt(props.id) }
  const { profile } = useProfile()

  return (
    <>
      {
        profile?.id &&
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
              {
                props?.postId &&
                <div className="modal-action hero-content p-1 mt-3">
                  <label
                    className={BTN_CLASS.primary}
                    htmlFor="NotificationModal"
                    onClick={async () => {
                      await axios.put('/api/my/notifications/read', data)
                      await newNotifications()
                      await router.push(`/tweet/${props.postId}`)
                    }}
                  >
                    View Post
                  </label>
                </div>
              }
              <div className="modal-action hero-content">
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
      }
    </>
  )
}

export default NotificationModal
