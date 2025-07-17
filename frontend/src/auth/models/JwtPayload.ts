export interface JwtPayload {
  userId: string;
  role: 'admin' | 'cliente';
  iat?: number; // issued at
  exp?: number; // expiration time
}
