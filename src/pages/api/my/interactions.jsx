import nextConnect from 'next-connect'
import prisma from '../../../controllers/_helpers/prisma'
import handleErrors from '../../../controllers/_helpers/handleErrors'
import auth from '../../../controllers/_middlewares/auth'

const handler = nextConnect()

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const getFollowing = await prisma.interaction.findMany({
        where: {
          postUserId: req.session.user.id
        }

      })

      return res.status(201).json(getFollowing)
    } catch (err) {
      return handleErrors(res, err)
    }
  })
export default handler
