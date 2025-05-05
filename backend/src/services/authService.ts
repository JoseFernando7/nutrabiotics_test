import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/jwt'
import { User } from '../models/user'
import { CreateUserDTO } from '../dtos/user/createUserDto'
import { UserResponseDTO } from '../dtos/user/userResponseDto'

export const loginService = async (username: string, password: string): Promise<{ token: string, user: UserResponseDTO }> => {
  const user = await User.findOne({ username })

  if (user === null) {
    throw new Error('USER_NOT_FOUND')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('INVALID_PASSWORD')
  }

  const token = generateToken({ userId: user._id, role: user.role })

  return { token, user: { userId: user._id.toString(), username: user.username, role: user.role } }
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

  // // Generate a token for the new user
  // const token = generateToken({ userId: newUser._id, role: newUser.role })

  // const user: UserResponseDTO = {
  //   userId: newUser._id.toString(),
  //   username: newUser.username,
  //   role: newUser.role
  // }

  const message = 'Usuario creado correctamente'

  return { message }
}
