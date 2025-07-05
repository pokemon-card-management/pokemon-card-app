import axios from 'axios';

// React Native/Expoでは localhost ではなく実際のIPアドレスを使用
const BASE_URL = 'http://192.168.0.18:3000';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface AuthError {
  error: string;
  message: string;
  status: number;
}

/**
 * サインインAPI呼び出し
 */
export const signIn = async (credentials: SignInRequest): Promise<SignInResponse> => {
  try {
    const response = await axios.post<SignInResponse>(`${BASE_URL}/auth/signin`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const authError = error.response.data as AuthError;
      throw new Error(authError.message || 'サインインに失敗しました');
    }
    throw new Error('ネットワークエラーが発生しました');
  }
};

/**
 * プロフィール取得API呼び出し
 */
export const getProfile = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const authError = error.response.data as AuthError;
      throw new Error(authError.message || 'プロフィール取得に失敗しました');
    }
    throw new Error('ネットワークエラーが発生しました');
  }
};