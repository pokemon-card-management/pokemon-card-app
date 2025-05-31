import { ZodSchema } from 'zod'
import { throwHttpError } from 'utils/errors'
import type { ErrorInfo } from 'types/httpStatus'

export function validateWithSchema<T>(
  schema: ZodSchema<T>,
  value: unknown,
  errorToThrow: ErrorInfo
): T {
  const parsed = schema.safeParse(value)
  if (!parsed.success) {
    throwHttpError(errorToThrow)
  }
  return parsed.data!
}

