import useSWR from 'swr'
import axios from 'axios'

const useFollowing = (userName) => {
  const { data: following, mutate: newFollowing } = useSWR(
    userName ? (`/api/users/${userName}/following`) : null,
    (key) => axios.get(key).then((res) => res.data)
  )

  return {
    following,
    newFollowing
  }
}

export default useFollowing
