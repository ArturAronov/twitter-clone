import nextConnect from 'next-connect'
import auth from '../../../../prisma/hooks/controllers/_middlewares/auth'

const handler = nextConnect()

handler
  .use(auth)
  .delete(async (req, res) => {
    req.session.destroy()
    res.status(201).json({"msg": "successfully logged out"})
  })

export default handler
