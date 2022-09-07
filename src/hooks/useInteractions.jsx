import useSWR from 'swr'
import axios from 'axios'

export default function useInteractions() {
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const { data: interactions, mutate: newInteraction } = useSWR('/api/my/interactions', fetcher)

  return {
    interactions,
    newInteraction
  }
}
