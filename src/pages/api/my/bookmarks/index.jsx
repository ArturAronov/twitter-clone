import nextConnect from 'next-connect'
import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'
import auth from '../../../../controllers/_middlewares/auth'

const handler = nextConnect()

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const bookmarks = await prisma.interaction.findMany({
        where: {
          actionType: 'BOOKMARK',
          postUserId: req.session.user.id
        },
        include: {
          post: {
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
          },
        }
      })

      return res.status(200).json(bookmarks)
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
