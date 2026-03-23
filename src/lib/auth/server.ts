import { Resend } from 'resend'
import { betterAuth } from 'better-auth'
import { bearer, emailOTP, jwt } from 'better-auth/plugins'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import { prisma } from '@/lib/prisma'
import { VerifyFluigTemplate } from '@/templates/verify-fluig-template'

const resend = new Resend(process.env.RESEND_API_KEY!)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: false,
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
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  plugins: [
    bearer(),
    jwt({
      jwks: {
        keyPairConfig: {
          alg: 'RS256',
        },
      },
    }),
    emailOTP({
      expiresIn: 300,

      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: 'delivered@resend.dev',
          to: email,
          subject: `${otp} - Seu código de login do Controle de Fluigs`,
          react: VerifyFluigTemplate({ verificationCode: otp }),
        })
      },
    }),
  ],
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
