import { useRouter } from 'next/router'
import useFollowers from '../../hooks/useFollowers'
import useFollowing from '../../hooks/useFollowing'

const Stats = (props) => {
  const { query: { slug } } = useRouter()
  const { followers } = useFollowers(slug[0])
  const { following } = useFollowing(slug[0])

  return (
    <div className="mt-2 flex flex-row px-3">
      <div className="mr-5 hover:underline cursor-pointer">
        <span className="font-bold pr-1"> { following && following.length } </span>
        <span className="text-zinc-500">Following</span>
      </div>
      <div className="hover:underline cursor-pointer">
        <span className="font-bold pr-1"> { followers && followers.length } </span>
        <span className="text-zinc-500">Followers</span>
      </div>
    </div>
  )
}

export default Stats
