import TweetSmall from '../tweet/TweetSmall'

const Likes = (props) => (
  <>
    {
      props?.APIdata
      && props.APIdata.map((element) => (
        <div key={element.id}>
          <TweetSmall tweetData={element} userData={props.user} />
        </div>
      ))
    }
  </>
)

export default Likes
