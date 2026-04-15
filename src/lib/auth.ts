import { Resend } from 'resend'
import { betterAuth } from 'better-auth'
import { emailOTP } from 'better-auth/plugins'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY!)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
  },
  rateLimit: {
    storage: 'database',
    modelName: 'rateLimit',
    window: 30,
    max: 5,
  },
  basePath: '/api/auth',
  baseURL: process.env.BETTER_AUTH_URL,
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 300,
    },
  },
  plugins: [
    emailOTP({
      expiresIn: 300,
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: 'Controle de Fluigs <noreply@controlflow.cloud>',
          to: email,
          subject: `${otp} - Seu código de verificação`,
          template: {
            id: 'verify-code',
            variables: {
              VERIFY_CODE: otp,
            },
          },
        })
      },
    }),
  ],
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
