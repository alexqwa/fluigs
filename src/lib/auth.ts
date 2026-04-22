import { Resend } from 'resend'
import { betterAuth } from 'better-auth'
import { i18n } from '@better-auth/i18n'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP, admin as adminPlugin } from 'better-auth/plugins'

import { prisma } from '@/lib/prisma'
import { ac, admin, user } from '@/lib/permissions'

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
  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },
      branch: {
        type: 'number',
        input: false,
      },
    },
  },
  plugins: [
    adminPlugin({
      adminRoles: ['admin'],
      adminUserIds: ['JTcCPD9CRTOg5jDG5ggAUdbB2DhCFmE9'],
      ac,
      roles: {
        user,
        admin,
      },
    }),
    i18n({
      translations: {
        pt: {
          YOU_ARE_NOT_ALLOWED_TO_LIST_USERS:
            'Você não tem permissão para listar usuários',
          INVALID_EMAIL_OR_PASSWORD: 'E-mail ou senha inválidos',
          INVALID_OTP: 'Código de 6 dígitos inválido',
        },
      },
    }),
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
