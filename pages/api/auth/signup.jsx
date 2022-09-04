import nextConnect from 'next-connect'
import * as yup from 'yup'
import crypto from 'crypto'

import prisma from '../../../controllers/_helpers/prisma'
import handleErrors from '../../../controllers/_helpers/handleErrors'
import auth from '../../../controllers/_middlewares/auth'

const handler = nextConnect()

const userInput = yup.object({
  name: yup.string().required().test({
    message: () => 'Please enter your name',
    test: (value) => value
  }),
  dateOfBirth: yup.string().required(),
  email: yup.string().email().required().test({
    message: () => 'Email already exists',
    test: async (value) => {
      try {
        await prisma.user.findUnique({
          where: {
            email: value
          },
          rejectOnNotFound: true
        })

        return false
      } catch (err) {
        return true
      }
    }
  }),
  password: yup.string().min(6).required(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password must match').required()
})

handler
  .use(auth)
  .post(async (req, res) => {
    try {
      const verifiedInput = await userInput.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      })

      const { password, name, email, dateOfBirth } = verifiedInput

      // Here you should create the user and save the salt and hashed password (some dbs may have
      // authentication methods that will do it for you so you don't have to worry about it):
      const salt = crypto.randomBytes(16).toString('hex')
      const passwordHash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          dateOfBirth: new Date(dateOfBirth),
          salt
        }
      })

      // Assign new user a userName that is its id.
      await prisma.user.update({
        where: {
          id: newUser.id
        },
        data: {
          userName: newUser.id
        }
      })

      req.session.user = { id: newUser.id }
      await req.session.save()

      res.status(200).json({ success: true, message: 'created new user' })
    } catch (err) {
      handleErrors(res, err)
    }
  })

export default handler
