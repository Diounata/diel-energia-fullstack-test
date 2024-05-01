import z from 'zod'

const REQUIRED_FIELD = 'Este campo é obrigatório'

export const taskSchema = z.object({
  title: z.string().min(1, REQUIRED_FIELD).max(50, 'Título deve ser menor que 50 caracteres'),
  description: z.string().min(1, REQUIRED_FIELD),
  startsAt: z.string().min(1, REQUIRED_FIELD).datetime(),
  endsAt: z.string().min(1, REQUIRED_FIELD).datetime(),
})

export type FormInput = z.infer<typeof taskSchema>
