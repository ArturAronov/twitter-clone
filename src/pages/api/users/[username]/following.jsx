import nextConnect from 'next-connect'
import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'

const handler = nextConnect()

handler
  .get(async (req, res) => {
    try {
      console.log(req.query)
      const profile = await prisma.user.findFirst({
        where: {
          userName: req.query.username
        }
      })

      const getFollowers = await prisma.interaction.findMany({
        where: {
          actionType: 'FOLLOW',
          interactionUserId: profile.id
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              userName: true,
              bio: true,
              avatarImg: true
            }
          }
        }
      })

      return res.status(201).json(getFollowers)
    } catch (err) {
      return handleErrors(res, err)
    }
  })
export default handler
