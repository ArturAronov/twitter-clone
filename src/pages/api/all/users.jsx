import nextConnect from 'next-connect'

import prisma from '../../../controllers/_helpers/prisma'
import handleErrors from '../../../controllers/_helpers/handleErrors'

const handler = nextConnect()

handler
  .get(async (req, res) => {
    try {
      const user = await prisma.user.findMany({
        select: {
          id: true,
          userName: true,
          name: true,
          bio: true,
          avatarImg: true
        }
      })

      return res.status(201).json(user)
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
