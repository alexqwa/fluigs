import {
  Hr,
  Html,
  Body,
  Head,
  Text,
  Heading,
  Preview,
  Section,
  Tailwind,
  Container,
} from '@react-email/components'

interface FluigVerifyEmailProps {
  verificationCode?: string
}

export function EmailVerifyFluig({ verificationCode }: FluigVerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-aws bg-white text-[#212121]">
          <Preview>AWS Email Verification</Preview>
          <Container className="mx-auto bg-[#eee] p-5">
            <Section className="bg-white">
              <Section className="px-8 py-6">
                <Heading className="font-googleSans mb-3.5 text-[20px] font-bold text-[#333]">
                  Verifique seu endereço de e-mail
                </Heading>
                <Text className="mx-0 mt-6 mb-3.5 text-[14px] leading-6 text-[#333]">
                  Obrigado por iniciar o processo de autenticação de uma conta
                  da CFlow. Queremos garantir que é realmente você. Insira o
                  seguinte código de verificação quando solicitado. Se não
                  quiser fazer autenticação, ignore esta mensagem.
                </Text>
                <Section className="flex items-center justify-center">
                  <Text className="m-0 text-center text-[14px] font-bold text-[#333]">
                    Código de verificação
                  </Text>

                  <Text className="mx-0 my-2.5 text-center text-[36px] font-bold text-[#333]">
                    {verificationCode}
                  </Text>
                  <Text className="m-0 text-center text-[14px] text-[#333]">
                    (Este código é válido por apenas 5 minutos)
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section className="px-8 py-6">
                <Text className="m-0 text-[14px] text-[#333]">
                  A CFlow nunca lhe enviará e-mails pedindo que você divulgue ou
                  verifique sua senha, cartão de crédito ou número de conta
                  bancária.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
