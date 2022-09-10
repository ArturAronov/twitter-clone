import useSWR from 'swr'
import axios from 'axios'

const useStats = (postId) => {
  const { data: stats, mutate: newStats } = useSWR(
    postId ? (`/api/post/stats/${postId}`) : null,
    (key) => axios.get(key).then((res) => res.data)
  )

  return {
    stats,
    newStats
  }
}

export default useStats
