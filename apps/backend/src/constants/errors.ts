import type { ErrorInfo } from 'types/httpStatus'

export const ERRORS: Record<string, ErrorInfo> = {
    ITEM_NOT_FOUND: {
      status: 404,
      message: 'Item not found',
    },
    UNAUTHORIZED: {
      status: 401,
      message: 'Unauthorized access',
    },
    INVALID_ITEM_SHAPE: {
      status: 500,
      message: 'Invalid item structure'
    },
  }
  