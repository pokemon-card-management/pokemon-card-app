export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSignInRequest {
  email: string;
  password: string;
}

export interface UserSignInResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface JWTPayload {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}