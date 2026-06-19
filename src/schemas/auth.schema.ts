import { z } from 'zod'

export const registroSchema = z.object({
  body: z.object({
    nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
  })
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido'),
    senha: z.string().min(1, 'A senha é obrigatória')
  })
})
