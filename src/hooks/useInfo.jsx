import useSWR from 'swr'
import axios from 'axios'

const userInfo = (userName) => {
  const { data: user, mutate } = useSWR(
    userName ? (`/api/users/${userName}`) : null,
    (key) => axios.get(key).then((res) => res.data)
  )

  return {
    user,
    mutate
  }
}

export default userInfo
