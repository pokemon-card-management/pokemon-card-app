import { UserRepository } from '../repositories/user.repository';
import { AuthUtils } from '../utils/auth';
import { throwAuthError } from '../utils/errors';
import type { User, UserSignInRequest, UserSignInResponse } from '../types/user';
import { AUTH_ERROR_MESSAGES, AUTH_STATUS_CODES } from '../constants/auth';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signIn(signInData: UserSignInRequest): Promise<UserSignInResponse> {
    const { email, password } = signInData;

    // ユーザーをメールアドレスで検索
    const user: User | null = await this.userRepository.findByEmail(email);
    if (!user) {
      throwAuthError(
        AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS,
        AUTH_STATUS_CODES.UNAUTHORIZED
      );
    }
    // パスワードを検証
    const isPasswordValid = await AuthUtils.verifyPassword(password, user!.password);
    if (!isPasswordValid) {
      throwAuthError(
        AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS,
        AUTH_STATUS_CODES.UNAUTHORIZED
      );
    }
    // JWTトークンを生成
    const token = AuthUtils.generateToken({
      userId: user!.id,
      email: user!.email
    });

    // レスポンスを返す（パスワードを除外）
    return {
      token,
      user: {
        id: user!.id,
        username: user!.username,
        email: user!.email
      }
    };
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throwAuthError(
        AUTH_ERROR_MESSAGES.USER_NOT_FOUND,
        AUTH_STATUS_CODES.NOT_FOUND
      );
    }

    // パスワードを除外してレスポンス
    const { password, ...userWithoutPassword } = user!;
    return userWithoutPassword;
  }
}
