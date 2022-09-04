import _ from 'lodash'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import prisma from '@/controllers/_helpers/prisma'

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    const inputHash = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
      .toString('hex')
    const passwordsMatch = user.hash === inputHash

    if (!user) {
      return done(null, false, { email: 'Email Not Found' })
    }

    if (!await passwordsMatch) {
      return done(null, false, { password: 'Incorrect Password' })
    }

    return done(null, _.omit(user, ['passwordHash']))
  } catch (err) {
    return done(err)
  }
}
)
)

export default passport
