import bcrypt from 'bcryptjs'
import { findUser } from './findUser'
import { User } from '../../models/user'
import { UserDocument } from '../../models/user'
import { validatePassword } from './validatePassword'
import { buildAuthResponde } from './buildAuthResponse'
import { CreateUserDTO } from '../../dtos/user/createUserDto'
import { UserResponseDTO } from '../../dtos/user/userResponseDto'
import { findExistingUser } from './findExistingUser'
import { hashPassword } from './hashPassword'
import { createUser } from './createUser'

export type LoginDeps = {
  findUserByUsername: (username: string) => Promise<UserDocument | null>
  comparePassword: (plain: string, hashed: string) => Promise<boolean>
  generateToken: (payload: object) => string
}

export type RegisterDeps = {
  findExistingUser: (username: string) => Promise<UserDocument | null>
  hashPassword: (password: string) => Promise<string>
  createUser: (userData: CreateUserDTO) => Promise<UserDocument>
}

export const loginService = async (username: string, password: string, deps: LoginDeps): Promise<{ token: string, user: UserResponseDTO }> => {
  const user = await findUser(username, deps.findUserByUsername)
  await validatePassword(password, user?.password, deps.comparePassword)

  return buildAuthResponde(user, deps.generateToken)
}

export const registerService = async (createUserDTO: CreateUserDTO, deps: RegisterDeps): Promise<{ message: string }> => {
  // Verify if the user already exists
  findExistingUser(createUserDTO.username, deps.findExistingUser)

  // Hash the password
  const hashedPassword = await hashPassword(createUserDTO.password, deps.hashPassword)

  // Create the new user
  const newUser = await createUser(createUserDTO, hashedPassword)

  // Save the new user to the database
  await newUser.save()

  const message = 'Usuario creado correctamente'

  return { message }
}
