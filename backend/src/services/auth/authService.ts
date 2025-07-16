import bcrypt from 'bcryptjs'
import { User } from '../../models/user'
import { UserDocument } from '../../models/user'
import { CreateUserDTO } from '../../dtos/user/createUserDto'
import { UserResponseDTO } from '../../dtos/user/userResponseDto'
import { validatePassword } from './validatePassword'
import { buildAuthResponde } from './buildAuthResponse'
import { findUser } from './findUser'

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

export const registerService = async (createUserDTO: CreateUserDTO): Promise<{ message: string }> => {
  // Verify if the user already exists
  const existingUser = await User.findOne({ username: createUserDTO.username })
  if (existingUser !== null) throw new Error('USER_ALREADY_EXISTS')

  // Hash the password
  const hashedPassword = await bcrypt.hash(createUserDTO.password, 10)

  // Create the new user
  const newUser = new User({
    username: createUserDTO.username,
    password: hashedPassword,
    role: createUserDTO.role
  })

  await newUser.save()

  const message = 'Usuario creado correctamente'

  return { message }
}
