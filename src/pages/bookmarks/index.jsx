import useBookmarks from '../../hooks/useBookmarks'
import TweetFull from '../../components/tweet/TweetFull'

const Bookmarks = () => {
  const { bookmarks } = useBookmarks()

  return(
    <>
      { bookmarks &&
        bookmarks.map(element =>{
          return (
            <div key={element.id}>
              <TweetFull tweetData={element.post} />
            </div>
          )
        })
      }
    </>
  )
};


export default Bookmarks;
