import { useState, useEffect } from 'react'
import router from 'next/router'
import axios from 'axios'
import FormData from 'form-data'

import TinyRetweet from './TinyRetweet'
import TweetLengthProgress from './TweetLengthProgress'

import useStats from '../../hooks/useStats'
import useProfile from '../../hooks/useProfile'

import TweetBtnActive from '../buttons/TweetBtnActive'
import TweetBtnInactive from '../buttons/TweetBtnInactive'
import ImgUploadBtn from '../buttons/ImgUploadBtn'
import CloseBtn from '../buttons/CloseBtn'

const NewTweet = (props) => {
  const [postId, setPostId] = useState()
  const [text, setText] = useState('')
  const [percent, setPercent] = useState(0)
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [button, setButton] = useState(<TweetBtnInactive />)
  const [buttonActive, setButtonActive] = useState(false)
  const { newStats } = useStats(postId)
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
    let notificationData = {
      userId: profile.id
    }

    let objData = {
      content: text || ' ',
    }

    if(selectedFile) {
      if(postType === 'RETWEET') {
        notificationData = {
          ...notificationData,
          content: `${props.user.userName} retweeted your post`
        }

        objData = {
          ...objData,
          postType: 'MEDIA',
          postId: props.post.id
        }
      } else if(postType === 'REPLY') {
        notificationData = {
          ...notificationData,
          content: `${props.user.userName} replied to your post your post`
        }

        objData = {
          ...objData,
          postType: 'MEDIA',
          postId: props.post.id
        }
      } else {
        objData = {
          ...objData,
          postType: 'MEDIA',
        }
      }

      objData = {
        ...objData,
        postType: 'MEDIA',
      }
    } else if(postType === 'RETWEET') {
      notificationData = {
        ...notificationData,
        receivingUser: props.post.userId,
        content: `${profile.userName} retweeted your post`,
      }


      objData = {
        ...objData,
        postType: props.postType,
        postId: props.post.id
      }
    } else if(postType === 'REPLY') {
      notificationData = {
        ...notificationData,
        receivingUser: props.post.userId,
        content: `${profile.userName} replied to your post your post`,
      }

      objData = {
        ...objData,
        postType: props.postType,
        postId: props.post.id
      }
    }

    selectedFile && data.append('mediaUrl', selectedFile)

    for (let i in objData) {
      data.append(i, objData[i])
    }

    let newPostId;

    await axios
      .post('/api/my/posts', data)
      .then(res => {
        newPostId = res.data.id
        notificationData = {
          ...notificationData,
          postId: res.data.id
        }
      })

    notificationData?.content && await axios.post('/api/my/notifications/post', notificationData)

    if(postType === 'REPLY'){
      await router.push(`/tweet/${props.post.id}`)
    } else {
      await router.push(`/tweet/${newPostId}`)
    }
    await newStats()
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
    props?.post && setPostId(props.post.id)

    if ((text.length || selectedFile) && profile?.id) {
      if(props.postType === 'REPLY') {
        setButton(<TweetBtnActive action={'Reply'}/>)
        setButtonActive(true)
      } else if(props.postType === 'RETWEET') {
        setButton(<TweetBtnActive action={'Retweet'}/>)
        setButtonActive(true)
      } else {
        setButton(<TweetBtnActive action={'Tweet'}/>)
        setButtonActive(true)
      }
    } else if (props.postType === 'RETWEET' && profile?.id) {
      setButton(<TweetBtnActive action={'Retweet'}/>)
      setButtonActive(true)
    } else {
      if(props.postType === 'REPLY') {
        setButton(<TweetBtnInactive action={'Reply'}/>)
        setButtonActive(false)
      } else if(props.postType === 'RETWEET') {
        setButton(<TweetBtnInactive action={'Retweet'}/>)
        setButtonActive(false)
      } else {
        setButton(<TweetBtnInactive action={'Tweet'}/>)
        setButtonActive(false)
      }
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
        <div>
          {
            preview &&
            <div className="relative flex justify-center">
              <div
                className="btn btn-sm btn-circle absolute right-0 top-0 m-1 text-xl backdrop-blur-sm backdrop-contrast-50 text-zinc-0"
                onClick={handleImageRemove}
              >
              <CloseBtn />
              </div>
              <img src={preview} />
            </div>
          }
          {
            props.postType === 'RETWEET' &&
            <div className="py-3">
              <TinyRetweet postId={props.post.id} />
            </div>

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
          <div className="flex flex-row p-2 hero-content" htmlFor="TweetModal">
            {text.length > 0 && <TweetLengthProgress percent={percent} />}
            <div
              htmlFor="TweetModal"
              onClick={() => {
                buttonActive && handleSubmit(props.postType)
              }}
            >
              { button }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewTweet
