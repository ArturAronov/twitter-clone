import useSWR from 'swr'
import axios from 'axios'

const useBookmarks = (userName) => {
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const { data: bookmarks } = useSWR('/api/my/bookmarks', fetcher)

  return {
    bookmarks,
  }
}

export default useBookmarks
