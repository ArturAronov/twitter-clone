import * as yup from 'yup'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import _ from 'lodash'
import crypto from 'crypto'
import nextConnect from 'next-connect'

import auth from '../../../../prisma/hooks/controllers/_middlewares/auth'
import handleErrors from '../../../../prisma/hooks/controllers/_helpers/handleErrors'
import prisma from '../../../../prisma/hooks/controllers/_helpers/prisma'

const handler = nextConnect()

const userInput = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

handler
  .use(auth)
  .post(async (req, res) => {
    try {
      const authenticate = (req, res) => {
        passport.use(new LocalStrategy({
          // email and password keys in the database get assigned to passport's values. Passport will automatically retrieve those values from the body
          usernameField: 'email',
          passwordField: 'password',
          session: false
          // email and password are values, done is a function
        }, async (email, password, done) => {
          try {
            // Validate if the email exists in the database and return the user data
            const user = await prisma.user.findFirst({
              where: {
                email
              }
            })

            // Should there be no such email, return the following error message
            if (!user) return done(null, false, { email: 'Email Not Found' })

            // Should the password hash not match with the database, return the following error message

            const inputHash = crypto
              .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
              .toString('hex')
            const passwordsMatch = user.passwordHash === inputHash

            if (!passwordsMatch) return done(null, false, { password: 'Incorrect Password' })

            // Should the email and password match, return the user without the password hash
            return done(null, _.omit(user, ['passwordHash']))
          } catch (err) {
            return done(err)
          }

        // done callback function gets executed
        })).authenticate('local', async (err, user, info) => {
        // Should there be issus retrieving user data from database, return 500 Internal Server Error
          if (err) return res.status(500).end(err.toString())

          // Should there be issues with the validation, return 401 Unauthorized, and the error message
          if (!user) return res.status(401).json(info)

          // On user validation, store the credentials in the cookies
          req.session.user = { id: user.id }
          await req.session.save()

          return res.status(200).json(user)
        })(req, res)
      }

      const { body } = req
      await userInput.validate(body, {
        abortEarly: false,
        stripUnknown: true
      })
      return authenticate(req, res)
    } catch (err) {
      return handleErrors(res, err)
    }
  })

export default handler
