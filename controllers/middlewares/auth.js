import nextConnect from 'next-connect'
import { ironSession } from 'iron-session/express'
import passport from '../../lib/passport'

const auth = nextConnect()
  .use(ironSession({
    password: process.env.TOKEN_SECRET,
    cookieName: 'session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  }))
  .use(passport.initialize())
  .use(passport.session())

export default auth
