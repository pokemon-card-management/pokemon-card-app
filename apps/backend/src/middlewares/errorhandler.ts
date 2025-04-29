import type { Context, Next } from 'hono'

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (err: any) {
    console.error(err)
    return c.json({ message: err.message || 'Internal Server Error' }, 500)
  }
}
