export interface CreateUserDTO {
  username: string
  password: string
  role: 'admin' | 'cliente'
}
