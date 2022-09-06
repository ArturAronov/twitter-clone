const TweetsCount = (props) => (
  <div className="grid grid-cols-1 divide-y text-zinc-500">
    <div />
    <div className="py-5 px-3"> {props.tweets} Tweets</div>
    <div />
  </div>
)

export default TweetsCount
