import nextConnect from 'next-connect'
import * as yup from 'yup'
import _ from 'lodash'
import crypto from 'crypto'

import auth from '../../../../controllers/_middlewares/auth'
import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'
import parseData from '../../../../controllers/_middlewares/parse-data'
import uploadFileAsync from '../../../../lib/upload-file.js'

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = nextConnect()

const userInput = yup.object({
  userName: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  bio: yup.string().max(280),
  avatarImg: yup.mixed(),
  headerImg: yup.mixed(),
  location: yup.string(),
  website: yup.string(),
  dateOfBirth: yup.string(),
  password: yup.string().min(6),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password must match')
})

handler
  .use(auth)
  .use(parseData)
  .use(async (req, res, next) => {
    try {
      // If user enter a userName, verify that it hasn't already been taken by a another user. If it has, then stop the process with HTML status 500, if not, proceed to the next step.
      if (req?.body?.userName) {
        const queryUserNames = await prisma.user.findMany({
          where: {
            userName: req.body.userName
          }
        })

        queryUserNames.length > 0
          ? res.status(500).json({ msg: 'This username has been already taken' })
          : next()
      } else {
        return next()
      }
    } catch (err) {
      handleErrors(res, err)
    }
  }).use(async (req, res, next) => {
    try {
      // If user enter a email, verify that it hasn't already been taken by a another user. If it has, then stop the process with HTML status 500, if not, proceed to the next step.
      if (req?.body?.email) {
        const queryEmails = await prisma.user.findMany({
          where: {
            email: req.body.email
          }
        })

        queryEmails.length > 0
          ? res.status(500).json({ msg: 'This email has been already taken' })
          : next()
      } else {
        return next()
      }
    } catch (err) {
      handleErrors(res, err)
    }
  })
  .put(async (req, res) => {
    try {
      // User input data
      const verifiedInput = await userInput.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      })

      // Get existing data for the user
      const useProfile = await prisma.user.findUnique({
        where: {
          id: req.session.user.id
        }
      })

      if (await verifiedInput.avatarImg) {
        const uuid = `${await useProfile.id}avatar`
        await uploadFileAsync(uuid, verifiedInput, req)
      }
      if (await verifiedInput.headerImg) {
        const uuid = `${await useProfile.id}header`
        await uploadFileAsync(uuid, verifiedInput, req)
      }

      const salt = verifiedInput?.password
        ? crypto.randomBytes(16).toString('hex')
        : verifiedInput.salt

      const passwordHash = verifiedInput?.password
        ? crypto
          .pbkdf2Sync(verifiedInput.password, salt, 1000, 64, 'sha512')
          .toString('hex')
        : verifiedInput.passwordHash

      const updatedProfile = await prisma.user.update({
        where: {
          id: req.session.user.id
        },
        data: {
          userName: verifiedInput.userName || useProfile.userName,
          name: verifiedInput.name || useProfile.name,
          email: verifiedInput.email || useProfile.email,
          bio: verifiedInput.bio || useProfile.bio,
          avatarImg: verifiedInput.avatarImg || useProfile.avatarImg,
          headerImg: verifiedInput.headerImg || useProfile.headerImg,
          location: verifiedInput.location || useProfile.location,
          website: verifiedInput.website || useProfile.website,
          dateOfBirth: verifiedInput.dateOfBirth || useProfile.dateOfBirth,
          salt,
          passwordHash
        }
      })

      return res.status(200).json(_.omit(updatedProfile, ['passwordHash', 'salt']))
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
