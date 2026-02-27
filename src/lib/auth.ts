import { Resend } from 'resend'
import { betterAuth } from 'better-auth'
import { emailOTP } from 'better-auth/plugins'

const resend = new Resend(process.env.RESEND_API_KEY!)

export const auth = betterAuth({
  emailAndPassword: {
    enabled: false,
  },
  basePath: '/api/auth',
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ['http://localhost:3000/**', 'https://fluigs.vercel.app/**'],
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        resend.emails.send({
          from: 'delivered@resend.dev',
          to: email,
          subject: 'Seu código de verificação',
          html: `<h1>Código ${otp}</h1>`,
        })
      },
    }),
  ],
})
