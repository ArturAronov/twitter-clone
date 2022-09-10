import nextConnect from 'next-connect'

import prisma from '../../../controllers/_helpers/prisma'
import handleErrors from '../../../controllers/_helpers/handleErrors'

const handler = nextConnect()

handler
  .get(async (req, res) => {
    try {
      const post = await prisma.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              userName: true,
              name: true,
              avatarImg: true,
              bio: true
            }
          }
        }
      })

      return res.status(201).json(post)
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
