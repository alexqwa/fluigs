import { nextCookies } from 'better-auth/next-js'
import { createAuthClient } from 'better-auth/react'
import {
  emailOTPClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins'

import { auth } from '@/lib/auth/server'

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    nextCookies(),
    inferAdditionalFields<typeof auth>(),
  ],
  baseURL: process.env.BETTER_AUTH_URL,
})
