"use server"

import { Resend } from "resend"
import { OTPEmailTemplate } from "@/components/emails/otp-email-template"

const resend = new Resend(process.env.RESEND_API_KEY)

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, storeName } = body

    if (!email) {
      return Response.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      )
    }

    const otp = generateOTP()

    const { data, error } = await resend.emails.send({
      from: "Fluigs <onboarding@resend.dev>",
      to: [email],
      subject: `${otp} é o seu código de verificação`,
      react: OTPEmailTemplate({
        otp,
        storeName: storeName || "Usuário",
      }),
    })

    if (error) {
      console.error("Erro ao enviar email:", error)
      return Response.json(
        { error: "Falha ao enviar email de verificação" },
        { status: 500 }
      )
    }

    return Response.json({
      success: true,
      message: "Código enviado com sucesso",
      data,
    })
  } catch (error) {
    console.error("Erro no servidor:", error)
    return Response.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
