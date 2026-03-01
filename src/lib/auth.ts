import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'
import { betterAuth } from 'better-auth'
import { emailOTP } from 'better-auth/plugins'
import { prismaAdapter } from 'better-auth/adapters/prisma'

const resend = new Resend(process.env.RESEND_API_KEY!)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
  },
  basePath: '/api/auth',
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        resend.emails.send({
          from: 'delivered@resend.dev',
          to: email,
          subject: 'Seu código de verificação',
          html: `<h1>${otp}</h1>`,
        })
      },
    }),
  ],
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
