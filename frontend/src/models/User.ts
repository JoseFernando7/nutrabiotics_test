export interface User {
  userId: string;
  username: string;
  password: string;
  role: 'admin' | 'cliente';
}
