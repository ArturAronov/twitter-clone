import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'

import prisma from '../controllers/_helpers/prisma'

import Profile from '../components/profile/Profile'
import Likes from '../components/feeds/Likes'
import Media from '../components/feeds/Media'
import Tweets from '../components/feeds/Tweets'
import TweetsWithReplies from '../components/feeds/TweetsWithReplies'

const PagesUserInfo = ({ user }) => {
  const { query: { slug }, replace } = useRouter()
  const [feed, setFeed] = useState(<Tweets />)

  useEffect(() => {
    if (slug[1] === 'tweets') {
      setFeed(<Tweets user={user.slug.userClean} APIdata={user.slug.APIdata} />)
    } else if (slug[1] === 'with-replies') {
      setFeed(<TweetsWithReplies user={user.slug.userClean} APIdata={user.slug.APIdata} />)
    } else if (slug[1] === 'media') {
      setFeed(<Media user={user.slug.userClean} APIdata={user.slug.APIdata} />)
    } else if (slug[1] === 'likes') {
      setFeed(<Likes user={user.slug.userClean} APIdata={user.slug.APIdata} />)
    }
  }, [slug])

  return (
    <div className="flex flex-col">
      <Profile
        input={user.slug}
      />
      { feed }
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const userName = context.query.slug[0]
  const page = context.query.slug[1]

  let APIdata

  const user = await prisma.user.findFirst({
    where: {
      userName
    }
  })

  const postCount = user?.id && await prisma.post.count({
    where: {
      userId: user.id,
      postType: {
        in: ['RETWEET', 'TWEET']
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

  if (page === 'tweets') {
    APIdata = await prisma.post.findMany({
      where: {
        userId: user.id,
        postType: {
          in: ['TWEET', 'RETWEET', 'MEDIA']
        }
      },
      orderBy: {
        date: 'desc'
      }
    })
  } else if (page === 'with-replies') {
    APIdata = await prisma.post.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        date: 'desc'
      }
    })
  } else if (page === 'media') {
    APIdata = await prisma.post.findMany({
      where: {
        userId: user.id,
        postType: 'MEDIA'
      },
      orderBy: {
        date: 'desc'
      }
    })
  } else if (page === 'likes') {
    APIdata = await prisma.interaction.findMany({
      where: {
        postUserId: user.id,
        actionType: 'LIKE'
      },
      include: {
        post: {
          select: {
            content: true,
            date: true,
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })
  }

  const userClean = await _.omit(user, ['passwordHash', 'salt'])

  return {
    props: {
      user: {
        slug: { userClean, postCount, APIdata }
      }
    }
  }
}

export default PagesUserInfo
