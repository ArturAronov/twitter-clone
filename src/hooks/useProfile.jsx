import useSWR from 'swr'
import axios from 'axios'

const userProfile = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const { data: profile, mutate: newProfile } = useSWR('/api/my/profile', fetcher)

  return {
    profile,
    newProfile
  }
}

export default userProfile
