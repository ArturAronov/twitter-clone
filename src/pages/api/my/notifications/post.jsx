import nextConnect from 'next-connect'
import * as yup from 'yup'
import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'
import auth from '../../../../controllers/_middlewares/auth'

const handler = nextConnect()
const userInput = yup.object({
  userId: yup.string().required(),
  content: yup.string().required(),
  receivingUser: yup.string().required()
})

handler
  .use(auth)
  .use(async (req, res, next) => {
    // Verify that user exists under tha passed ID
    const user = await prisma.user.findFirst({
      where: {
        id: req.body.userId
      }
    })

    if (!user) {
      return res.status(500).json({ msg: `No such user with id of ${req.body.userId}` })
    }
    next()
  })
  .post(async (req, res) => {
    try {
      const verifiedInput = await userInput.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      })

      const notification = await prisma.notification.create({
        data: {
          userId: verifiedInput.userId,
          content: verifiedInput.content,
          receivingUser: verifiedInput.receivingUser
        }
      })

      return res.status(200).json(notification)
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
