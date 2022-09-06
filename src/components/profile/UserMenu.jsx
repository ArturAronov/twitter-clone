const UserMenu = (props) => {
  const {
    tab
  } = props

  const textActive = 'pb-2 text-zinc-50'
  const textInactive = 'pb-2 text-zinc-500'

  return (
    <div className="flex flex-row justify-between sm:justify-evenly text-sm sm:text-base font-normal sm:font-bold mt-3 w-full overflow-x-auto">
      <div
        onClick={() => props.onTabClick('tweets')}
        className="hover:bg-zinc-800 pb-0 pt-3 block flex w-9/12 sm:w-full justify-center cursor-pointer"
      >
        <div className="grid grid-cols-1 divide-y divide-sky-500 divide-y-4">
          <div className={(tab === 'tweets' || tab === '') ? textActive : textInactive}>
            Tweets
          </div>
          {(tab === 'tweets' || tab === '') && <div />}
        </div>
      </div>
      <div
        onClick={() => props.onTabClick('with-replies')}
        className="hover:bg-zinc-800 pb-0 pt-3 block flex w-full justify-center cursor-pointer"
      >
        <div className="grid grid-cols-1 divide-y divide-sky-500 divide-y-4">
          <div className={(tab === 'with-replies' || tab === '') ? textActive : textInactive}>
            Tweets & Replies
          </div>
          {tab === 'with-replies' && <div />}
        </div>
      </div>
      <div
        onClick={() => props.onTabClick('media')}
        className="hover:bg-zinc-800 pb-0 pt-3 block flex w-9/12 sm:w-full justify-center cursor-pointer"
      >
        <div className="grid grid-cols-1 divide-y divide-sky-500 divide-y-4">
          <div className={(tab === 'media' || tab === '') ? textActive : textInactive}>
            Media
          </div>
          {tab === 'media' && <div />}
        </div>
      </div>
      <div
        onClick={() => props.onTabClick('likes')}
        className="hover:bg-zinc-800 pb-0 pt-3 block flex w-9/12 sm:w-full justify-center cursor-pointer"
      >
        <div className="grid grid-cols-1 divide-y divide-sky-500 divide-y-4">
          <div className={(tab === 'likes' || tab === '') ? textActive : textInactive}>
            Likes
          </div>
          {tab === 'likes' && <div />}
        </div>
        <div className=" divider-sky-500" />
      </div>
    </div>
  )
}

export default UserMenu
