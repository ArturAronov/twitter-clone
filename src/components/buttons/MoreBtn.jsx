import { useState, useEffect } from 'react'
import router from 'next/router'
import axios from 'axios'

import useProfile from '../../hooks/useProfile'
import MoreIcon from '../icons/MoreIcon'
import useAllPosts from '../../hooks/useAllPosts'

const MoreBtn = (props) => {
  const [displayBtn, setDisplayBtn] = useState(false)
  const { profile } = useProfile()
  const { newAllPosts } = useAllPosts()

  const handleDeleteTweet = async() => {
    await axios.delete('/api/my/posts/delete', {params: {postId: props.postId}})
    await newAllPosts()

    if(props.newPage) {
      router.push('/')
    }
  }

  useEffect(() => {
    if(profile?.id && props.user === profile.id) {
      setDisplayBtn(true)
    } else {
      setDisplayBtn(false)
    }
  }, [])
  return(
    <>
      {
        displayBtn &&
        <div className='hover:bg-zinc-700 rounded-full w-6 h-6 hero-content w-content'>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer">
              <MoreIcon />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-32 shadow-md hover:bg-zinc-900 bg-zinc-1000 shadow-zinc-500">
              <li
                className='cursor-pointer text-red-600'
                onClick={async() => handleDeleteTweet()}
              >
                Delete Tweet
              </li>
            </ul>
          </div>
        </div>
      }
    </>
  )
}

export default MoreBtn
