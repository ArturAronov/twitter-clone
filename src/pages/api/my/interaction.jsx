import nextConnect from 'next-connect'
import prisma from '../../../controllers/_helpers/prisma'
import handleErrors from '../../../controllers/_helpers/handleErrors'
import auth from '../../../controllers/_middlewares/auth'

const handler = nextConnect()

handler
  .use(auth)
  .use(async (req, res, next) => {
    // Find the user under given ID exists for actionType FOLLOW
    const findUser = await prisma.user.findFirst({
      where: {
        id: req.body.interactionUserId
      }
    })

    // Handle error if actionType is FOLLOW and there is no user found under given ID / no user ID has been entered
    if (req.body.actionType === 'FOLLOW' && !findUser) {
      return res.status(500).json({ msg: 'Please enter a valid user ID you want to follow' })
    }
    return next()
  })
  .use(async (req, res, next) => {
    // Find the post under given ID exists for actionType LIKE or BOOKMARK
    const findPost = req.body.postId && await prisma.post.findFirst({
      where: {
        id: parseInt(req.body.postId)
      }
    })

    // Handle error if actionType is LIKE or BOOKMARK and there is no post found under given ID / no post ID has been entered
    if (req.body.actionType === ('LIKE' || 'BOOKMARK') && !findPost) {
      return res.status(500).json({ msg: 'Please enter a valid post ID you want to invoke interaction for' })
    }
    return next()
  })
  .put(async (req, res) => {
    try {
      const postId = parseInt(req.body.postId)
      const postUserId = req.session.user.id

      const {
        actionType,
        interactionUserId
      } = req.body

      // Find if the post has been already like by the user
      const postInteractedAlready = await prisma.interaction.findMany({
        where: {
          actionType,
          postUserId: postUserId || null,
          postId: postId || null,
          interactionUserId: interactionUserId || null
        }
      })

      let action

      // If the post has already been liked/bookmarked or user followed by the user, then delete the action (unlike / unbookmark the post or unfollow the user), otherwise create the like/bookmark (like/bookmark the post) or follow the user
      if (postInteractedAlready.length > 0) {
        action = await prisma.interaction.delete({
          where: {
            id: parseInt(postInteractedAlready[0].id)
          }
        })
      } else {
        action = await prisma.interaction.create({
          data: {
            actionType,
            postUserId,
            postId: postId || null,
            interactionUserId: interactionUserId || null
          }
        })
      }

      return res.status(201).json(action)
    } catch (err) {
      return handleErrors(res, err)
    }
  })

export default handler
