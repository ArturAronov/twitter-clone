import {useState, useEffect} from 'react'
import useBookmarks from '../../hooks/useBookmarks'
import TweetFull from '../../components/tweet/TweetFull'

const Bookmarks = () => {
  const [bookmark, setBookmark] = useState([])
  const { bookmarks } = useBookmarks()

  useEffect(() => {
    setBookmark(bookmarks)
  }, [bookmarks])
  return(
    <>
      { bookmark.length>0 &&
        bookmark.map(element =>{
          return (
            <div key={element.id}>
              <TweetFull tweet={element.post} />
            </div>
          )
        })
      }
    </>
  )
};


export default Bookmarks;
