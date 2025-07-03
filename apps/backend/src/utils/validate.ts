import { ZodType } from 'zod'
import { throwHttpError } from 'utils/errors'
import type { ErrorInfo } from 'types/httpStatus'

/**
 * 任意の値をZodスキーマで検証し、失敗時は指定されたHTTPエラーを投げる。
 * 
 * @param schema Zod型
 * @param value 任意の検証対象値
 * @param errorToThrow 検証失敗時に投げるHTTPエラー情報
 * @returns パース済みデータ
 */
export function validateWithSchema<T>(
  schema: ZodType<T>,
  value: unknown,
  errorToThrow: ErrorInfo
): T {
  const result = schema.safeParse(value)
  if (!result.success) {
    console.error(result.error.format())
    throwHttpError(errorToThrow)
  }

  return result.data!
}
