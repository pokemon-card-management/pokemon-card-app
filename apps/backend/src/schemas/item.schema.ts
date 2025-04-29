import { z } from 'zod'

export const ItemIdParamSchema = z.object({
  id: z.string().uuid(),
})

export const ItemSchema = z.object({
  name: z.string().min(1),
})

export const itemPartialSchema = ItemSchema.partial()

export const ItemListSchema = z.array(ItemSchema)
