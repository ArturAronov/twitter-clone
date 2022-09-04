import { useRouter } from 'next/router'
import BTN_CLASS from '../../globalVars/btn_class'

const SidebarTweetBtn = () => {
  const router = useRouter()
  return (
    <div className="flex justify-center sm:relative sm:right-0 sm:bottom-0 fixed right-8 bottom-20 sm:mt-5">
      <div className={BTN_CLASS.sidebarTweet} onClick={() => router.push('/compose/tweet')}>
        <div className="text-4xl">
          +
        </div>
      </div>
    </div>
  )
}

export default SidebarTweetBtn
