import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (err: any) {
    console.error('Error caught in middleware:', err)

    if (err instanceof HTTPException) {
      const res = err.getResponse()
      const body = await res.json().catch(() => null)
      return c.json(body || { message: err.message }, err.status)
    }

    return c.json({ message: 'Internal Server Error' }, 500)
  }
}
