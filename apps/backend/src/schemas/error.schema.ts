import { z } from "@hono/zod-openapi";

// **エラーメッセージの基本スキーマ**
export const errorMessageSchema = z
  .string()
  .openapi({ example: "Bad Request" });

// **エラー詳細のスキーマ（キー: フィールド名, 値: エラーメッセージ配列）**
export const errorDetailsSchema = z
  .record(z.array(z.string()))
  .optional()
  .openapi({
    example: {
      email: ["Invalid email format"],
      password: ["Password must be at least 8 characters long"],
    },
  });

// **エラーレスポンスの基本スキーマ**
export const errorResponseSchema = z.object({
  message: errorMessageSchema,
  errors: errorDetailsSchema,
});

// **汎用的なエラーレスポンスの定義**
export const errorResponses = {
  400: {
    description: "Bad Request",
    content: {
      "application/json": {
        schema: errorResponseSchema.openapi({
          example: {
            message: "Bad Request",
            errors: {
              username: ["Username is required"],
            },
          },
        }),
      },
    },
  },
  401: {
    description: "Unauthorized",
    content: {
      "application/json": {
        schema: errorResponseSchema.openapi({
          example: {
            message: "Unauthorized",
          },
        }),
      },
    },
  },
  500: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: errorResponseSchema.openapi({
          example: {
            message: "Internal Server Error",
          },
        }),
      },
    },
  },
} as const;
