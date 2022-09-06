import { useState, useEffect } from 'react'
import router from 'next/router'
import axios from 'axios'
import FormData from 'form-data'

import useProfile from '../../hooks/useProfile'

import TinyRetweet from './TinyRetweet'

import TweetBtnActive from '../buttons/TweetBtnActive'
import TweetBtnInactive from '../buttons/TweetBtnInactive'
import ImgUploadBtn from '../buttons/ImgUploadBtn'

import TweetLengthProgress from './TweetLengthProgress'

const NewTweet = (props) => {
  const [text, setText] = useState('')
  const [percent, setPercent] = useState(0)
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [button, setButton] = useState(<TweetBtnInactive />)
  const [buttonActive, setButtonActive] = useState(false)
  const { profile } = useProfile()

  const data = new FormData()

  const handleTweetInput = (e) => {
    if (e.target.value.length < 280) {
      setText(e.target.value)
    }

    // This changes the height of the textarea box.
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const handleSubmit = async (postType) => {
    const retweetNotification = `${props.user.userName} retweeted your post`
    const replyNotification = `${props.user.userName} replied to your post your post`

    const objData = {
      postType: selectedFile ? 'MEDIA' : props.postType,
      content: text || ' ',
      postId: props.post.id ? props.post.id : null
    }

    const notificationData = {
      userId: profile.id,
      content: props.postType === 'RETWEET' ? retweetNotification : replyNotification
    }

    selectedFile && data.append('mediaUrl', selectedFile)

    for (let i in objData) {
      data.append(i, objData[i])
    }

    await axios.post('/api/my/posts', data)
    props.postType && await axios.post('/api/my/notifications/post', notificationData)
    await router.push(`/${profile.userName}`)
  }

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null)
      return
    }
    setSelectedFile(e.target.files[0])
  }

  const handleImageRemove = () => {
    setPreview(null)
    setSelectedFile(null)
  }

  useEffect(() => {
    if ((text.length || selectedFile) && profile?.id) {
      setButton(<TweetBtnActive />)
      setButtonActive(true)
    } else if (props.postType === 'RETWEET' && profile?.id) {
      setButton(<TweetBtnActive />)
      setButtonActive(true)
    } else {
      setButton(<TweetBtnInactive />)
      setButtonActive(false)
    }

    setPercent((text.length * 100) / 280)

    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [text, selectedFile, props])

  return (
    <div className="flex flex-row bg-base-100 p-5">
      <div className="avatar">
        <div className="h-16 rounded-full">
          { profile?.avatarImg && <img src={profile.avatarImg} /> }
        </div>
      </div>

      <div className="w-full flex flex-col grid-cols-1 divide-y divide-zinc-700">
        <div>
          <textarea
            value={text}
            placeholder="What's happening?"
            className="textarea bg-zinc-1000 text-2xl w-full overflow-hidden h-full text-zinc-0"
            onChange={(e) => handleTweetInput(e)}
          />
        </div>
        {
              props.postType === 'RETWEET'
              && (
              <div className="py-3">
                <TinyRetweet postId={props.post.id} />
              </div>
              )
            }

        <div>
          {
              preview
              && (
              <div className="relative flex justify-center">
                <div
                  className="btn btn-sm btn-circle absolute right-0 top-0 m-1 text-xl backdrop-blur-sm backdrop-contrast-50 text-zinc-0"
                  onClick={handleImageRemove}
                >
                  ✕
                </div>
                <img src={preview} />
              </div>
              )
            }
        </div>

        <div className="flex flex-row justify-between">
          <div className="p-5">
            <label onChange={(e) => {
              onSelectFile(e)
              data.delete('mediaUrl')
              data.append('mediaUrl', e.target.files[0])
            }}
            >
              <ImgUploadBtn />
              <input className="hidden" type="file" />
            </label>
          </div>
          <div className="flex flex-row p-2 hero-content">
            {text.length > 0 && <TweetLengthProgress percent={percent} />}
            <label
              htmlFor="TweetModal"
              onClick={() => {
                buttonActive && handleSubmit(props.postType || 'TWEET')
              }}
            >
              { button }
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewTweet
