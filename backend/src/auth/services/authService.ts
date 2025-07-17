import { findUser } from './findUser'
import { RegisterDeps } from './registerDeps'
import { UserDocument } from '../../user/models/user'
import { validatePassword } from './validatePassword'
import { buildAuthResponde } from './buildAuthResponse'
import { CreateUserDTO } from '../../user/dtos/createUserDto'
import { UserResponseDTO } from '../../user/dtos/userResponseDto'

export type LoginDeps = {
  findUserByUsername: (username: string) => Promise<UserDocument | null>
  comparePassword: (plain: string, hashed: string) => Promise<boolean>
  generateToken: (payload: object) => string
}

export const loginService = async (username: string, password: string, deps: LoginDeps): Promise<{ token: string, user: UserResponseDTO }> => {
  const user = await findUser(username, deps.findUserByUsername)
  await validatePassword(password, user?.password, deps.comparePassword)
  
  return buildAuthResponde(user, deps.generateToken)
}

export const registerService = async (createUserDTO: CreateUserDTO, deps: RegisterDeps): Promise<{ message: string }> => {
  // Verify if the user already exists
  const existing = await deps.findExistingUser(createUserDTO.username)
  if (existing) throw new Error('USER_ALREADY_EXISTS')

  // Hash the password
  const hashedPassword = await deps.hashPassword(createUserDTO.password)

  // Create the new user
  await deps.createUser({
    ...createUserDTO,
    password: hashedPassword
  })

  return { message: "Usuario creado correctamente" }
}
