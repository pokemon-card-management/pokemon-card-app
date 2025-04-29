// src/middlewares/errorHandler.ts
import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (err: any) {
    if (err instanceof HTTPException) {
      return c.json({ message: err.message }, err.status)
    }
    console.error(err)
    return c.json({ message: 'Internal Server Error' }, 500)
  }
}
