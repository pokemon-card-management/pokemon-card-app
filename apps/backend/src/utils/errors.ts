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

// 認証関連エラー専用のヘルパー関数
export const throwAuthError = (message: string, status: number): never => {
  throw new HTTPException(status, {
    message: JSON.stringify({
      message,
      status,
    }),
  })
}
