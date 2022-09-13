import prisma from '../../controllers/_helpers/prisma'

import TweetFull from '../../components/tweet/TweetFull'
import TweetSmallMap from '../../components/tweet/TweetSmallMap'

const Tweet = (props) => (
  <>
    {
      props?.post?.id ?
      <div>
        {console.log(props)}
        <TweetFull tweetData={props.post} replies={props.replies} />
        <TweetSmallMap keyName={'replies'} tweets={props.replies}/>
      </div>
      :
      <div className='text-center text-zinc-500 mt-10'>
        Hmm...this tweet doesn’t exist. Try searching for something else.
      </div>
    }
  </>
)

export async function getServerSideProps(context) {
  const postId = context.query.id

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId)
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          userName: true,
          avatarImg: true
        }
      }
    }
  })

  const replies = await prisma.post.findMany({
    where: {
      postType: 'REPLY',
      postId: parseInt(postId)
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          userName: true,
          avatarImg: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

  return {
    props: {
      post,
      replies
    }
  }
}

export default Tweet
