import useSWR from 'swr'
import axios from 'axios'

export default function useAllPosts() {
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const { data: allPosts, mutate: newAllPosts } = useSWR('/api/all/posts', fetcher)

  return {
    allPosts,
    newAllPosts
  }
}
