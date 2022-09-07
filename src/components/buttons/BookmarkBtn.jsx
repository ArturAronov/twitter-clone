import { useState, useEffect } from 'react'
import axios from 'axios'

import useInteractions from '../../hooks/useInteractions'
import RemoveBookmark from './RemoveBookmark'
import AddBookmark from './AddBookmark'

const BookmarkBtn = (props) => {
  const { interactions, newInteraction } = useInteractions()

  const [button, setButton] = useState()
  const [bookmarks, setBookmarks] = useState([])

  const toggleInteraction = async (postId, interaction) => {
    const data = {
      actionType: interaction,
      postId
    }
    await axios.put('/api/my/interaction', data)
    await newInteraction()
  }

  const bookmark = () => {
    setBookmarks(interactions.filter((element) => element.actionType === 'BOOKMARK' && element.postId === props.id))
  }

  const getData = async () => {
    const data = await axios.get('/api/my/interactions').then((res) => res.data)

    await setBookmarks(data.filter((element) => element.actionType === 'BOOKMARK' && element.postId === props.id))

    return data
  }
  useEffect(() => {
    getData()
  }, [interactions])

  useEffect(() => {
    bookmarks.length === 1 ? setButton(<RemoveBookmark />) : setButton(<AddBookmark />)
  }, [bookmarks, interactions])

  return (
    <div
      className="cursor-pointer"
      onClick={async () => {
        await toggleInteraction(props.id, 'BOOKMARK')
        await bookmark()
      }}
    >
      {button}
    </div>
  )
}

export default BookmarkBtn
