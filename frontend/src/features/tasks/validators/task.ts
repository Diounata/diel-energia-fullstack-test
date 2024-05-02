import z from 'zod'

const REQUIRED_FIELD = 'Este campo é obrigatório'

export const taskSchema = z
  .object({
    title: z.string().min(1, REQUIRED_FIELD).max(50, 'Título deve ser menor que 50 caracteres'),
    description: z.string().min(1, REQUIRED_FIELD),
    startsAt: z.coerce.date({ invalid_type_error: REQUIRED_FIELD }),
    endsAt: z.coerce.date({ required_error: REQUIRED_FIELD }),
  })
  .refine(({ startsAt, endsAt }) => endsAt >= startsAt, {
    message: 'Data de término deve ser menor que data de início',
    path: ['endsAt'],
  })
  .transform(fields => ({
    ...fields,
    startsAt: fields.startsAt.toISOString(),
    endsAt: fields.endsAt.toISOString(),
  }))

export type FormInput = z.infer<typeof taskSchema>
