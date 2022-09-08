import TweetFull from '../../components/tweet/TweetFull'
import prisma from '../../controllers/_helpers/prisma'

const Tweet = (props) => (
  <div>
    <TweetFull tweet={props.post} replies={props.replies} />
  </div>
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
