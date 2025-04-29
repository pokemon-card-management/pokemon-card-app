import { z } from 'zod'

export const itemSchema = z.object({
  name:       z.string().min(1),
  description: z.string().optional(),
})

export const itemPartialSchema = itemSchema.partial()
