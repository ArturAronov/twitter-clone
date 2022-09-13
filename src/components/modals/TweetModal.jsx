import NewTweet from '../tweet/NewTweet'
import TinyRetweet from '../tweet/TinyRetweet'
import CloseBtn from '../buttons/CloseBtn'

import useProfile from '../../hooks/useProfile'

const TweetModal = (props) => {
  const { profile } = useProfile()

  return(
    <>
      {
        profile?.id &&
        <div>
          <input className="modal-toggle" type="checkbox" id="TweetModal" />
          <div className="modal overflow-y-auto" htmlFor="TweetModal">
            <label className="flex flex-col bg-zinc-1000 border border-zinc-700 shadow-sm shadow-zinc-500 rounded-md w-1/2">
              <div className="modal-action">
                <label className="btn hover:bg-zinc-800 btn btn-sm btn-circle mx-4 my-2 text-2xl text-zinc-0" htmlFor="TweetModal">
                  <CloseBtn />
                </label>
              </div>
              {
                props.type === 'REPLY' &&
                <div className="px-6">
                  <TinyRetweet postId={props.post.id} reply={true}/>
                  <div className="flex flex-row px-7 py-2">
                    <div className="text-zinc-500">
                      Replying to
                    </div>
                    <div className="text-sky-600 pl-1">
                      @{props.user.userName}
                    </div>
                  </div>
                </div>
              }
              <label className="modal-box">
                <NewTweet postType={props.type} post={props.post} user={props.user} />
              </label>
            </label>
          </div>
        </div>
      }
    </>
  )
}


export default TweetModal
