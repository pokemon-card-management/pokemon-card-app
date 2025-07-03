import { z } from 'zod';
import { createRoute } from '@hono/zod-openapi';

// Sign In Request Schema
export const SignInRequestSchema = z.object({
  email: z
    .string()
    .email('有効なメールアドレスを入力してください')
    .min(1, 'メールアドレスは必須です'),
  password: z
    .string()
    .min(6, 'パスワードは6文字以上である必要があります')
    .max(100, 'パスワードは100文字以下である必要があります')
});

// Sign In Response Schema
export const SignInResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string()
  })
});

// Error Response Schema
export const AuthErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  status: z.number()
});

// Sign In Route Definition
export const signInRoute = createRoute({
  method: 'post',
  path: '/auth/signin',
  summary: 'ユーザーサインイン',
  description: 'メールアドレスとパスワードでユーザー認証を行い、JWTトークンを返します',
  tags: ['Authentication'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: SignInRequestSchema
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SignInResponseSchema
        }
      },
      description: 'サインイン成功'
    },
    400: {
      content: {
        'application/json': {
          schema: AuthErrorResponseSchema
        }
      },
      description: 'バリデーションエラー'
    },
    401: {
      content: {
        'application/json': {
          schema: AuthErrorResponseSchema
        }
      },
      description: '認証失敗'
    },
    500: {
      content: {
        'application/json': {
          schema: AuthErrorResponseSchema
        }
      },
      description: 'サーバーエラー'
    }
  }
});