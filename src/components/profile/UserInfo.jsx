import useProfile from '../../hooks/useProfile'
import FollowBtn from '../buttons/FollowBtn'

const UserInfo = (props) => {
  const { profile } = useProfile()

  const {
    id,
    avatarImg,
    name,
    userName,
    bio
  } = props

  return (
    <>
      <div className="flex flex-row justify-between p-3 -mt-16 items-end">
        {
          profile?.avatarImg
          && (
          <img
            src={avatarImg}
            className="w-28 h-28 object-cover rounded-full border-4 border-zinc-1000"
          />
          )
        }
        <FollowBtn id={id} userName={userName} />
      </div>
      <div className="text-lg font-bold px-3"> { name } </div>
      <div className="text-zinc-500 px-3"> @{ userName } </div>
      <div className="mt-2 px-3"> { bio } </div>
    </>
  )
}

export default UserInfo
