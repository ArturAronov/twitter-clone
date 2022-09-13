import nextConnect from 'next-connect'

import auth from '../../../../controllers/_middlewares/auth'
import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'

const handler = nextConnect()

handler
  .use(auth)
  .use(async(req, res, next) => {
    // Verify that the post that is getting deleted is the author of the post
    const postIdUser = await prisma.post.findUnique({
      where: {
        id: parseInt(req.query.postId)
      },
      select: {
        userId: true
      }
    })

    if(postIdUser.userId !== req.session.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this post' })
    }

    return next()
  })
  .delete(async (req, res) => {
    try {
      const post = await prisma.post.delete({
        where: {
          id: parseInt(req.query.postId)
        }
      })

      return res.status(201).json(post)
    } catch (err) {
      handleErrors(res, err)
    }
  })

export default handler
