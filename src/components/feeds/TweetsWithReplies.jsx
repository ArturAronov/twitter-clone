import TweetSmallMap from '../tweet/TweetSmallMap'

const TweetsWithReplies = (props) => (
  <>
    {
      props?.APIdata &&
      <TweetSmallMap keyName={'tweets'} tweets={props.APIdata} userData={props.user}/>
    }
  </>
)

export default TweetsWithReplies
