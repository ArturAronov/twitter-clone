import nextConnect from 'next-connect'
import auth from '../../../controllers/_middlewares/auth'

const handler = nextConnect()

handler
  .use(auth)
  .delete(async (req, res) => {
    req.session.destroy()
    res.status(201).json({ success: true, message: 'successfully logged out' })
  })

export default handler
