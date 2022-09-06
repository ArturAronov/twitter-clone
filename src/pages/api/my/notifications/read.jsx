import nextConnect from 'next-connect'
import handleErrors from '../../../../controllers/_helpers/handleErrors'
import auth from '../../../../controllers/_middlewares/auth'
import prisma from '../../../../controllers/_helpers/prisma'

const handler = nextConnect()

handler
  .use(auth)
  .put(async (req, res) => {
    try {
      const getNotifications = await prisma.notification.update({
        where: {
          id: parseInt(req.body.id)
        },
        data: {
          received: true,
          readDate: new Date()
        }
      })

      return res.status(200).json(getNotifications)
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
