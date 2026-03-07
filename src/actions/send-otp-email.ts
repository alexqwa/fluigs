'use server'

import { Resend } from 'resend'
import { OTPEmailTemplate } from '@/components/emails/otp-email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendOTPEmailParams {
  email: string
  storeName: string
}

export async function sendOTPEmail({ email, storeName }: SendOTPEmailParams) {
  try {
    // Gera um código OTP de 6 dígitos
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const { data, error } = await resend.emails.send({
      from: 'Fluigs <onboarding@resend.dev>',
      to: [email],
      subject: `Código de verificação: ${otp}`,
      react: OTPEmailTemplate({ otp, storeName }),
    })

    if (error) {
      console.error('Erro ao enviar email:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data, otp }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }
  }
}
