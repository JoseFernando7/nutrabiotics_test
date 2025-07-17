// import { User } from '../models/user'
// import { CreateUserDTO } from '../dtos/user/createUserDto'
// import { UserResponseDTO } from '../dtos/user/userResponseDto'

// export const createUser = async (userData: CreateUserDTO): Promise<UserResponseDTO> => {
//   const user = new User({
//     username: userData.username,
//     password: userData.password
//   })

//   const savedUser = await user.save()

//   return ({
//     userId: savedUser._id.toString(),
//     username: savedUser.username
//   })
// }

// export const getAllUsers = async (): Promise<UserResponseDTO[]> => {
//   const users = await User.find()

//   return users.map(user => ({
//     userId: user._id.toString(),
//     username: user.username
//   }))
// }
