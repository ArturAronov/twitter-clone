import TweetSmallMap from '../tweet/TweetSmallMap'

const Likes = (props) => (
  <>
    {
      props?.APIdata &&
      <TweetSmallMap keyName={'tweets'} tweets={props.APIdata} userData={props.user}/>
    }
  </>
)

export default Likes
