import nextConnect from 'next-connect'
import _ from 'lodash'
import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'

const handler = nextConnect()

handler
  .get(async (req, res) => {
    try {
      const queryUser = await prisma.user.findFirst({
        where: {
          id: req.query.id
        }
      })

      return res.status(201).json(_.omit(queryUser, ['passwordHash', 'salt']))
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
