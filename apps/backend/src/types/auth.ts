export interface AuthenticatedUser {
  userId: number;
  email: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
}