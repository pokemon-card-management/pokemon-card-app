import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (err: any) {
    console.error('Error caught in middleware:', err)

    if (err instanceof HTTPException) {
      try {
        // throwHttpErrorから来るエラーの場合、messageはJSON文字列
        const parsedMessage = JSON.parse(err.message)
        return c.json(parsedMessage, err.status)
      } catch {
        // JSON.parseに失敗した場合は、通常のメッセージとして扱う
        return c.json({ message: err.message }, err.status)
      }
    }

    return c.json({ message: 'Internal Server Error' }, 500)
  }
}
