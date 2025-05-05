export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role: 'admin' | 'cliente'; // Optional, depending on your authentication logic
}

export interface RegisterResponse {
  message: string;
}
