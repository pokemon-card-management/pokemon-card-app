// 認証関連の定数

// エラーコード
export const AUTH_ERROR_CODES = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
} as const;

// エラーメッセージ
export const AUTH_ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'サーバー内部エラーが発生しました',
  UNAUTHORIZED_TOKEN_REQUIRED: 'アクセストークンが必要です',
  INVALID_TOKEN: '無効なアクセストークンです',
  AUTH_FAILED: '認証に失敗しました',
  INVALID_CREDENTIALS: 'メールアドレスまたはパスワードが正しくありません',
  USER_NOT_FOUND: 'ユーザーが見つかりません',
} as const;

// ログメッセージ
export const AUTH_LOG_MESSAGES = {
  SIGN_IN_ERROR: 'Sign in error:',
  GET_PROFILE_ERROR: 'Get profile error:',
  AUTH_MIDDLEWARE_ERROR: 'Auth middleware error:',
} as const;

// HTTP ステータスコード（型安全性のため）
export const AUTH_STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type AuthErrorCode = keyof typeof AUTH_ERROR_CODES;
export type AuthErrorMessage = keyof typeof AUTH_ERROR_MESSAGES;
export type AuthLogMessage = keyof typeof AUTH_LOG_MESSAGES;
export type AuthStatusCode = typeof AUTH_STATUS_CODES[keyof typeof AUTH_STATUS_CODES];