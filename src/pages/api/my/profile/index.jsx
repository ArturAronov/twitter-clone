import nextConnect from 'next-connect'
import _ from 'lodash'

import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'
import auth from '../../../../controllers/_middlewares/auth'

const handler = nextConnect()

handler
  .use(auth)
  .get(async (req, res) => {
    try {
      const queryUser = await prisma.user.findFirst({
        where: {
          id: req.session.user.id
        }
      })

      return res.status(201).json(_.omit(queryUser, ['passwordHash', 'salt']))
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
