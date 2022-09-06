import useSWR from 'swr'
import axios from 'axios'

const useFollowers = (userName) => {
  const { data: followers, mutate: newFollowers } = useSWR(
    userName ? (`/api/users/${userName}/followers`) : null,
    (key) => axios.get(key).then((res) => res.data)
  )

  return {
    followers,
    newFollowers
  }
}

export default useFollowers
