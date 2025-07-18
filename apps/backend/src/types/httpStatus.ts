// https://developer.mozilla.org/ja/docs/Web/HTTP/Status を参考

type HttpErrorStatus =
  // クライアントエラー (400番台)
  | 400 // Bad Request: 不正なリクエスト
  | 401 // Unauthorized: 認証が必要
  | 403 // Forbidden: 権限なし
  | 404 // Not Found: リソースが存在しない
  | 409 // Conflict: 重複、競合
  | 422 // Unprocessable Entity: バリデーションエラーなど

  // サーバーエラー (500番台)
  | 500 // Internal Server Error: サーバー内部エラー
  | 502 // Bad Gateway: 下流サーバーから不正なレスポンス
  | 503 // Service Unavailable: 一時的な過負荷やメンテナンス

export type ErrorInfo = {
  status: HttpErrorStatus
  message: string
}

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
} as const;
