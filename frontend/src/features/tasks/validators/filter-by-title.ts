import z from 'zod'

export const filterTaskByTitleSchema = z.object({
  title: z.string().optional(),
})

export type FormInput = z.infer<typeof filterTaskByTitleSchema>
