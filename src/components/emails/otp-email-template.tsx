import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface OTPEmailTemplateProps {
  otp: string
  storeName: string
}

export function OTPEmailTemplate({ otp, storeName }: OTPEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Seu código de verificação: {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={logo}>Fluigs</Heading>
          </Section>

          <Heading style={heading}>Código de Verificação</Heading>

          <Text style={paragraph}>
            Olá, você solicitou acesso para a filial <strong>{storeName}</strong>
            . Use o código abaixo para continuar:
          </Text>

          <Section style={codeContainer}>
            <Text style={code}>{otp}</Text>
          </Section>

          <Text style={paragraph}>
            Este código expira em <strong>10 minutos</strong>.
          </Text>

          <Text style={paragraph}>
            Se você não solicitou este código, ignore este email.
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              Fluigs - Sistema de Controle de Filiais
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
}

const container = {
  backgroundColor: '#141414',
  margin: '0 auto',
  padding: '40px 20px',
  borderRadius: '8px',
  maxWidth: '480px',
}

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '32px',
}

const logo = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
}

const heading = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '600',
  textAlign: 'center' as const,
  margin: '0 0 24px',
}

const paragraph = {
  color: '#a1a1aa',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  margin: '0 0 16px',
}

const codeContainer = {
  backgroundColor: '#1f1f23',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  textAlign: 'center' as const,
}

const code = {
  color: '#ffffff',
  fontSize: '36px',
  fontWeight: '700',
  letterSpacing: '8px',
  margin: '0',
}

const footer = {
  marginTop: '32px',
  paddingTop: '24px',
  borderTop: '1px solid #27272a',
}

const footerText = {
  color: '#52525b',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
}

export default OTPEmailTemplate
