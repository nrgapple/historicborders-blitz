import { passportAuth } from 'blitz'
import db from 'db'
import { OAuth2Strategy, Profile, VerifyFunction } from 'passport-google-oauth'
import GitHubStrategy from 'passport-github'

const updateUser = async (
  profile: Profile | GitHubStrategy.Profile,
  done: VerifyFunction,
  source: 'google' | 'github'
) => {
  const email = profile.emails && profile.emails[0]?.value
  const image = profile.photos && profile.photos[0]?.value
  const sourceId = `${profile.id}-${source}`
  let where: { [key: string]: string | undefined } = { email }

  if (!email) {
    where = { sourceId }
  }

  const user = await db.user.upsert({
    where,
    create: {
      email,
      sourceId,
      name: profile.displayName,
      image,
    },
    update: { email, image, sourceId },
  })

  const publicData = {
    userId: user.id,
    roles: [user.role],
    image: user.image,
    source: source,
  }

  return done(undefined, { publicData })
}

export default passportAuth({
  successRedirectUrl: '/',
  errorRedirectUrl: '/',
  strategies: [
    {
      strategy: new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID ?? '',
          clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
          callbackURL: 'http://localhost:3000/api/auth/github/callback',
          scope: ['user:email'],
        },
        async function (_accessToken, _refreshToken, profile, done) {
          await updateUser(profile, done, 'github')
        }
      ),
    },
    {
      authenticateOptions: { scope: 'email profile' },
      strategy: new OAuth2Strategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID ?? '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
          callbackURL: 'http://localhost:3000/api/auth/google/callback',
        },
        async function (_accessToken, _refreshToken, profile, done) {
          await updateUser(profile, done, 'google')
        }
      ),
    },
  ],
})
