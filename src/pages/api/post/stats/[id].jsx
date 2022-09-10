import nextConnect from 'next-connect'

import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'

const handler = nextConnect()

handler
  .get(async (req, res) => {
    try {
      const replies = await prisma.post.count({
        where: {
          postId: parseInt(req.query.id),
          postType: 'REPLY'
        }
      })

      const retweets = await prisma.post.count({
        where: {
          postId: parseInt(req.query.id),
          postType: 'RETWEET'
        }
      })

      const likes = await prisma.interaction.count({
        where: {
          postId: parseInt(req.query.id),
          actionType: 'LIKE'
        }
      })

      const bookmarks = await prisma.interaction.count({
        where: {
          postId: parseInt(req.query.id),
          actionType: 'BOOKMARK'
        }
      })

      return res.status(201).json({replies, retweets, likes, bookmarks})
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
