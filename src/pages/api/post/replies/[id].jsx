import nextConnect from 'next-connect'

import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'

const handler = nextConnect()

handler
  .get(async (req, res) => {
    try {
      const replies = await prisma.post.findMany({
        where: {
          postId: parseInt(req.query.id),
          postType: 'REPLY'
        },
        include: {
          user: {
            select: {
              id: true,
              userName: true,
              name: true,
              bio: true,
              avatarImg: true
            }
          }
        }
      })

      return res.status(201).json(replies)
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
