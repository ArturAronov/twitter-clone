import useSWR from 'swr'
import axios from 'axios'

const TinyProfile = (props) => {
  const { data: userById } = useSWR(
    // Pass null when there is no id
    props.userId ? (`/api/usersId/${props.userId}`) : null,
    (key) => axios.get(key).then((res) => res.data)
  )
  return (
    <>
      {
        userById?.id
        && (
        <div className="flex flex-row">
          <img src={userById.avatarImg} className="w-5 h-5 object-cover rounded-full mx-1" />
          <div className="font-bold pr-1">{userById.name}</div>
          <div className="text-zinc-500 pr-1">@{userById.userName}</div>
        </div>
        )
      }
    </>
  )
}

export default TinyProfile
