import userProfile from '../../hooks/useProfile'

const UserStats = () => {
  const { profile } = userProfile()

  return (
    <div className="relative p-2">
      <div className="sticky left-0 right-0 font-bold mb-2"> Account Info </div>
      <div className="p-1">
        { profile?.avatarImg && <img src={profile.avatarImg} className="w-10 h-10 object-cover rounded-full" /> }
      </div>
      <div className="text-lg font-bold text-sm"> {profile?.name && profile.name} </div>
      <div className="text-lg text-zinc-500 text-sm">{profile?.name && `@${profile.userName}`} </div>
    </div>
  )
}

export default UserStats
