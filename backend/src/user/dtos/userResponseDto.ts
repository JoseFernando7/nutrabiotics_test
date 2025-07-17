export interface UserResponseDTO {
  userId: string
  username?: string
  role: 'admin' | 'cliente'
}
