import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { AuthService } from '../services/auth.service';
import type { UserSignInRequest } from '../types/user';
import type { AuthenticatedUser } from '../types/auth';
import { 
  AUTH_ERROR_CODES, 
  AUTH_ERROR_MESSAGES, 
  AUTH_LOG_MESSAGES,
  AUTH_STATUS_CODES 
} from '../constants/auth';
import { validateWithSchema } from '../utils/validate';
import { SignInRequestSchema } from '../schemas/auth.schema';
import { ERRORS } from '../constants/errors';

const authService = new AuthService();

export const signIn = async (c: Context) => {
  try {
    const requestBody = await c.req.json();    
    const validatedData: UserSignInRequest = validateWithSchema(
      SignInRequestSchema,
      requestBody,
      ERRORS.INVALID_AUTH_REQUEST
    );
    
    const result = await authService.signIn(validatedData);
    
    return c.json(result, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      const errorMessage = JSON.parse(error.message);
      
      // バリデーションエラー（400）とその他のエラーを区別
      if (errorMessage.status === 400) {
        return c.json(
          {
            error: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
            message: errorMessage.message,
            status: errorMessage.status
          },
          400
        );
      } else {
        return c.json(
          {
            error: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
            message: errorMessage.message,
            status: errorMessage.status
          },
          errorMessage.status as 401 | 403 | 404 | 500
        );
      }
    }

    console.error(AUTH_LOG_MESSAGES.SIGN_IN_ERROR, error);
    return c.json(
      {
        error: AUTH_ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: AUTH_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        status: AUTH_STATUS_CODES.INTERNAL_SERVER_ERROR
      },
      AUTH_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

export const getProfile = async (c: Context) => {
  try {
    const userFromToken = c.get('user') as AuthenticatedUser;
    
    const user = await authService.getUserById(userFromToken.userId);
    
    return c.json(user, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      const errorMessage = JSON.parse(error.message);
      return c.json(
        {
          error: AUTH_ERROR_CODES.USER_NOT_FOUND,
          message: errorMessage.message,
          status: errorMessage.status
        },
        errorMessage.status as 400 | 401 | 403 | 404 | 500
      );
    }

    console.error(AUTH_LOG_MESSAGES.GET_PROFILE_ERROR, error);
    return c.json(
      {
        error: AUTH_ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: AUTH_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        status: AUTH_STATUS_CODES.INTERNAL_SERVER_ERROR
      },
      AUTH_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};
