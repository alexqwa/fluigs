import { nextCookies } from 'better-auth/next-js'
import { createAuthClient } from 'better-auth/react'
import { emailOTPClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [emailOTPClient(), nextCookies()],
  baseURL: process.env.BETTER_AUTH_URL,
})
