import NewTweet from '../tweet/NewTweet'
import TinyRetweet from '../tweet/TinyRetweet'

const TweetModal = (props) => (
  <>
    <input className="modal-toggle" type="checkbox" id="TweetModal" />
    <div className="modal">
      <div className="flex flex-col bg-zinc-1000 border border-zinc-700 shadow-sm shadow-zinc-500 rounded-md w-1/2">
        <div className="modal-action">
          <label className="btn hover:bg-zinc-800" htmlFor="TweetModal">x</label>
        </div>
        {
            props.type === 'REPLY'
            && (
            <div className="px-6">
              <TinyRetweet postId={props.post.id} />
              <div className="flex flex-row px-7 py-2">
                <div className="text-zinc-500">
                  Replying to
                </div>
                <div className="text-sky-600 pl-1">
                  @{props.post.user.userName}
                </div>
              </div>
            </div>
            )
          }
        <div className="modal-box">
          <NewTweet postType={props.type} post={props.post} user={props.post.user || props.user} />
        </div>
      </div>
    </div>
  </>
)

export default TweetModal
