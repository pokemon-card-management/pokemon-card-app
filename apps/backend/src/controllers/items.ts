import type { Context } from 'hono'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'
import { ERRORS } from 'constants/errors'
import { throwHttpError } from 'utils/httpErrors'
import { 
  ItemSchema,
  ItemListSchema,
  itemPartialSchema
} from 'schemas/item.schema'

// モックデータストア（実際は DB access 層を用意する）
const store = new Map<string, z.infer<typeof ItemSchema>>()

export const getAllItems = (c: Context) => {
  const items = Array.from(store.values())
  const parsed = ItemListSchema.safeParse(items)
  if (!parsed.success) {
    throwHttpError(ERRORS.INVALID_ITEM_SHAPE)
  }
  return c.json(items)
}

export const getItemById = (c: Context) => {
  const id = c.req.param('id')
  const item = store.get(id)
  if (!item) {
    throwHttpError(ERRORS.ITEM_NOT_FOUND)
  }

  const parsed = ItemSchema.safeParse(item)
  if (!parsed.success) {
    throwHttpError(ERRORS.INVALID_ITEM_SHAPE)
  }
  return c.json(item)
}

export const createItem = async (c: Context) => {
  const data = c.req.valid('json')
  const id = uuid()
  const newItem = { id, ...data }
  store.set(id, newItem)

  const parsed = ItemSchema.safeParse(newItem)
  if (!parsed.success) {
    throwHttpError(ERRORS.INVALID_ITEM_SHAPE)
  }
  return c.json(newItem, 201)
}

export const updateItem = async (c: Context) => {
  const id = c.req.param('id')
  if (!store.has(id)) return c.json({ message: 'Not Found' }, 404)
  const data = await c.req.json()
  const existing = store.get(id)!
  const updated = { ...existing, ...data }
  store.set(id, updated)

  const parsed = ItemSchema.safeParse(updated)
  if (!parsed.success) {
    throwHttpError(ERRORS.INVALID_ITEM_SHAPE)
  }
  return c.json(updated)
}

export const deleteItem = (c: Context) => {
  const id = c.req.param('id')
  if (!store.delete(id)) {
    throwHttpError(ERRORS.ITEM_NOT_FOUND)
  }
  return c.json(null, 204)
}
