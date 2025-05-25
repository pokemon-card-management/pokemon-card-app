import { z } from 'zod'

export const ItemIdParamSchema = z.object({
  id: z.string(),
})

export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
export const ItemListSchema = z.array(ItemSchema)

export const CreateItemSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  description: z.string().optional(),
  price: z.number().nonnegative().optional(),
})

export const UpdateItemSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
})

export type ItemType = z.infer<typeof ItemSchema>
export type UpdateItemType = z.infer<typeof UpdateItemSchema>

export const IdParamSchema = z.coerce.number().int().positive()
