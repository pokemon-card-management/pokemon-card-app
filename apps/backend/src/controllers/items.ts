import type { Context } from 'hono'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'
import { itemSchema, itemPartialSchema } from '../schemas/item.schema'

// モックデータストア（実際は DB access 層を用意する）
const store = new Map<string, z.infer<typeof itemSchema>>()

export const getAllItems = (c: Context) => {
  return c.json(Array.from(store.values()))
}

export const getItemById = (c: Context) => {
  const id = c.req.param('id')
  const item = store.get(id)
  if (!item) return c.json({ message: 'Not Found' }, 404)
  return c.json(item)
}

export const createItem = async (c: Context) => {
  const body = await c.req.json()
  const parsed = itemSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ errors: parsed.error.flatten() }, 400)
  }
  const id = uuid()
  const newItem = { id, ...parsed.data }
  store.set(id, newItem)
  return c.json(newItem, 201)
}

export const updateItem = async (c: Context) => {
  const id = c.req.param('id')
  if (!store.has(id)) return c.json({ message: 'Not Found' }, 404)

  const body = await c.req.json()
  const parsed = itemPartialSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ errors: parsed.error.flatten() }, 400)
  }
  const existing = store.get(id)!
  const updated = { ...existing, ...parsed.data }
  store.set(id, updated)
  return c.json(updated)
}

export const deleteItem = (c: Context) => {
  const id = c.req.param('id')
  if (!store.delete(id)) {
    return c.json({ message: 'Not Found' }, 404)
  }
  return c.json(null, 204)
}
