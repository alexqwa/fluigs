import 'dotenv/config'
import { Resend } from 'resend'
import { betterAuth } from 'better-auth'
import { emailOTP } from 'better-auth/plugins'

const resend = new Resend('re_TbH67Gb7_GCgamrvEZbBc5yqhiKjbEnu1')

export const auth = betterAuth({
  baseURL: 'http://localhost:3000/',
  emailAndPassword: {
    enabled: false,
  },
  emailVerification: {
    autoSignInAfterVerification: true, // Crucial for automatically signing in after verification
  },

  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp }) {
        resend.emails.send({
          from: 'delivered@resend.dev',
          to: email,
          subject: 'Seu código de acesso',
          html: `
              <h1>${otp}</h1>
              <p>Código válido por 5 minutos</p>
            `,
        })
      },
    }),
  ],

  session: {
    additionalFields: {
      filialId: {
        type: 'number',
        required: true,
      },
    },
  },
})
