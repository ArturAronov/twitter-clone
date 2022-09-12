import TweetSmallMap from '../tweet/TweetSmallMap'

const Tweets = (props) => (
  <>
    {
      props?.APIdata &&
      <TweetSmallMap keyName={'tweets'} tweets={props.APIdata} userData={props.user}/>
    }

  </>
)

export default Tweets
