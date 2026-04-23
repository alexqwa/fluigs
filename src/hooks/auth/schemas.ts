import z from 'zod'

export const signInSchema = z.object({
  email: z.email('Insira um endereço de e-mail válido.'),
  otp: z
    .string()
    .length(6, 'O código de verificação deve ter pelo menos 6 caracteres.'),
})

export const signInSchemaAdmin = z.object({
  email: z.email('Digite um e-mail válido.'),
  password: z.string().min(4, 'A senha deve conter pelo menos 4 caracteres.'),
})

export type SignInSchema = z.infer<typeof signInSchema>
export type SignInSchemaAdmin = z.infer<typeof signInSchemaAdmin>
