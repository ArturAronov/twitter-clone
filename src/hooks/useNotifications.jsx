import useSWR from 'swr'
import axios from 'axios'

const useNotifications = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const { data: notifications, mutate: newNotifications } = useSWR('/api/my/notifications', fetcher)

  return {
    notifications,
    newNotifications
  }
}

export default useNotifications
