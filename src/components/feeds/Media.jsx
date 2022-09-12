import TweetSmallMap from '../tweet/TweetSmallMap'

const Media = (props) => (
  <>
    {
      props?.APIdata &&
      <TweetSmallMap keyName={'tweets'} tweets={props.APIdata} userData={props.user}/>
    }
  </>
)

export default Media
