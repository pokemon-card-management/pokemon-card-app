import type { Context, Next } from 'hono';
import { AuthUtils } from '../utils/auth';
import { 
  AUTH_ERROR_CODES, 
  AUTH_ERROR_MESSAGES, 
  AUTH_LOG_MESSAGES,
  AUTH_STATUS_CODES 
} from '../constants/auth';

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header('Authorization');
    console.log('Auth header:', authHeader);
    const token = AuthUtils.extractTokenFromHeader(authHeader);
    console.log('Extracted token:', token);

    if (!token) {
      return c.json(
        {
          error: AUTH_ERROR_CODES.UNAUTHORIZED,
          message: AUTH_ERROR_MESSAGES.UNAUTHORIZED_TOKEN_REQUIRED,
          status: AUTH_STATUS_CODES.UNAUTHORIZED
        },
        AUTH_STATUS_CODES.UNAUTHORIZED
      );
    }

    const payload = AuthUtils.verifyToken(token);
    if (!payload) {
      console.error('Token verification failed:', token);
      return c.json(
        {
          error: AUTH_ERROR_CODES.INVALID_TOKEN,
          message: AUTH_ERROR_MESSAGES.INVALID_TOKEN,
          status: AUTH_STATUS_CODES.UNAUTHORIZED
        },
        AUTH_STATUS_CODES.UNAUTHORIZED
      );
    }

    // ユーザー情報をコンテキストに設定
    c.set('user', {
      userId: payload.userId,
      email: payload.email
    });

    await next();
  } catch (error) {
    console.error(AUTH_LOG_MESSAGES.AUTH_MIDDLEWARE_ERROR, error);
    return c.json(
      {
        error: AUTH_ERROR_CODES.UNAUTHORIZED,
        message: AUTH_ERROR_MESSAGES.AUTH_FAILED,
        status: AUTH_STATUS_CODES.UNAUTHORIZED
      },
      AUTH_STATUS_CODES.UNAUTHORIZED
    );
  }
};
