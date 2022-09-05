const TweetLengthProgress = (props) => (
  <div
    className="radial-progress text-zinc-500 mx-2"
    style={{ '--value': 100, '--size': '1.5rem', '--thickness': '3px' }}
  >
    <div
      className="radial-progress text-sky-500 mx-2"
      style={{ '--value': props.percent, '--size': '1.5rem', '--thickness': '3px' }}
    />
  </div>
)

export default TweetLengthProgress
