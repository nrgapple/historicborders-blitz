import { passportAuth } from 'blitz'
import db from 'db'
import { OAuth2Strategy } from 'passport-google-oauth'

export default passportAuth({
  successRedirectUrl: '/borders',
  errorRedirectUrl: '/borders',
  strategies: [
    {
      authenticateOptions: { scope: 'email profile' },
      strategy: new OAuth2Strategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID ?? '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
          callbackURL: 'http://localhost:3000/api/auth/google/callback',
        },
        async function (_accessToken, _refreshToken, profile, done) {
          const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            return done(new Error("Google Oath2 response doesn't have an email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: 'google',
          }

          return done(undefined, { publicData })
        }
      ),
    },
  ],
})
