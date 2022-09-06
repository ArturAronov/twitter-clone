import nextConnect from 'next-connect'
import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'

const handler = nextConnect()

handler
  .get(async (req, res) => {
    try {
      const getPost = await prisma.post.findFirst({
        where: {
          id: parseInt(req.query.id)
        }
      })

      return res.status(200).json(getPost)
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
