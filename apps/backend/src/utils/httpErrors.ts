import { HTTPException } from 'hono/http-exception'
import type { ErrorInfo } from 'types/httpStatus'

export const throwHttpError = ({ status, message }: ErrorInfo): never => {
  throw new HTTPException(status, {
    message: JSON.stringify({
      message,
      status,
    }),
  })
}
